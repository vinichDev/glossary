from __future__ import annotations

import logging
import os
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, HTTPServer
from threading import Thread

import grpc
from google.protobuf.json_format import MessageToDict
from google.protobuf import timestamp_pb2
from grpc_reflection.v1alpha import reflection
from pydantic import ValidationError

from app import crud
from app.db import get_db, run_migrations
from app.models import Term
from app.proto import glossary_pb2, glossary_pb2_grpc
from app.schemas import TermCreate, TermUpdate

logger = logging.getLogger(__name__)


class _HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:  # noqa: N802
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, format: str, *args) -> None:  # noqa: A002
        return


@contextmanager
def db_session():
    db = next(get_db())
    try:
        yield db
    finally:
        db.close()


def _ensure_timezone(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value


def _timestamp_from_datetime(value: datetime) -> timestamp_pb2.Timestamp:
    timestamp = timestamp_pb2.Timestamp()
    timestamp.FromDatetime(_ensure_timezone(value))
    return timestamp


def _term_to_message(term: Term) -> glossary_pb2.Term:
    return glossary_pb2.Term(
        id=term.id,
        keyword=term.keyword,
        title=term.title,
        description=term.description,
        source=term.source,
        source_url=term.source_url,
        related=list(term.related or []),
        created_at=_timestamp_from_datetime(term.created_at),
        updated_at=_timestamp_from_datetime(term.updated_at),
    )


def _extract_source_url(term_payload: glossary_pb2.TermInput | glossary_pb2.TermUpdate) -> str:
    source_url = (term_payload.source_url or "").strip()
    if source_url:
        return source_url

    fallback = getattr(term_payload, "sourceUrl", "")
    if isinstance(fallback, str) and fallback.strip():
        return fallback.strip()

    payload_dict = MessageToDict(term_payload, preserving_proto_field_name=True)
    source_url_value = payload_dict.get("source_url") or payload_dict.get("sourceUrl") or ""
    return source_url_value.strip()


class GlossaryService(glossary_pb2_grpc.GlossaryServiceServicer):
    def ListTerms(self, request, context):
        with db_session() as db:
            terms = crud.list_terms(db)
        return glossary_pb2.ListTermsResponse(terms=[_term_to_message(term) for term in terms])

    def GetTerm(self, request, context):
        keyword = request.keyword.strip()
        if not keyword:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "Keyword is required")
        with db_session() as db:
            term = crud.get_term_by_keyword(db, keyword)
        if not term:
            context.abort(grpc.StatusCode.NOT_FOUND, "Term not found")
        return glossary_pb2.GetTermResponse(term=_term_to_message(term))

    def CreateTerm(self, request, context):
        term_payload = request.term
        source_url_value = _extract_source_url(term_payload)
        try:
            term_in = TermCreate.model_validate(
                {
                    "keyword": term_payload.keyword.strip(),
                    "title": term_payload.title.strip(),
                    "description": term_payload.description.strip(),
                    "source": term_payload.source.strip(),
                    "source_url": source_url_value,
                    "sourceUrl": source_url_value,
                    "related": list(term_payload.related),
                }
            )
        except ValidationError as exc:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, str(exc))

        with db_session() as db:
            existing = crud.get_term_by_keyword(db, term_in.keyword)
            if existing:
                context.abort(grpc.StatusCode.ALREADY_EXISTS, "Term already exists")
            term = crud.create_term(db, term_in)
        return glossary_pb2.CreateTermResponse(term=_term_to_message(term))

    def UpdateTerm(self, request, context):
        keyword = request.keyword.strip()
        if not keyword:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "Keyword is required")

        payload = request.term
        related_value = None
        if payload.clear_related:
            related_value = []
        elif payload.related:
            related_value = list(payload.related)

        source_url_value = _extract_source_url(payload)
        try:
            term_in = TermUpdate.model_validate(
                {
                    "title": payload.title.strip() or None,
                    "description": payload.description.strip() or None,
                    "source": payload.source.strip() or None,
                    "source_url": source_url_value or None,
                    "sourceUrl": source_url_value or None,
                    "related": related_value,
                }
            )
        except ValidationError as exc:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, str(exc))

        if not any(
            [
                term_in.title,
                term_in.description,
                term_in.source,
                term_in.source_url,
                term_in.related is not None,
            ]
        ):
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "No fields provided for update")

        with db_session() as db:
            term = crud.get_term_by_keyword(db, keyword)
            if not term:
                context.abort(grpc.StatusCode.NOT_FOUND, "Term not found")
            term = crud.update_term(db, term, term_in)
        return glossary_pb2.UpdateTermResponse(term=_term_to_message(term))

    def DeleteTerm(self, request, context):
        keyword = request.keyword.strip()
        if not keyword:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "Keyword is required")
        with db_session() as db:
            term = crud.get_term_by_keyword(db, keyword)
            if not term:
                context.abort(grpc.StatusCode.NOT_FOUND, "Term not found")
            crud.delete_term(db, term)
        return glossary_pb2.DeleteTermResponse()


def serve() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_migrations()

    server = grpc.server(ThreadPoolExecutor(max_workers=10))
    glossary_pb2_grpc.add_GlossaryServiceServicer_to_server(GlossaryService(), server)

    service_names = [
        glossary_pb2.DESCRIPTOR.services_by_name["GlossaryService"].full_name,
        reflection.SERVICE_NAME,
    ]
    reflection.enable_server_reflection(service_names, server)

    grpc_port = os.getenv("GRPC_PORT") or ""
    if "$PORT" in grpc_port or grpc_port.strip() == "":
        grpc_port = os.getenv("PORT", "8000")
    bind_result = server.add_insecure_port(f"[::]:{grpc_port}")
    if bind_result == 0:
        raise RuntimeError(f"Failed to bind gRPC server to port {grpc_port}")
    server.start()
    logger.info("gRPC server started on port %s", grpc_port)
    print(f"gRPC server is running on port {grpc_port}...", flush=True)

    health_port = os.getenv("PORT")
    if health_port and health_port != grpc_port:
        httpd = HTTPServer(("0.0.0.0", int(health_port)), _HealthHandler)
        Thread(target=httpd.serve_forever, daemon=True).start()
        logger.info("HTTP health check started on port %s", health_port)
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
