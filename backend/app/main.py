from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from app import crud
from app.db import get_db, run_migrations
from app.docs import generate_static_docs
from app.schemas import TermCreate, TermRead, TermUpdate

app = FastAPI(title="Glossary API", version="1.0.0")


@app.on_event("startup")
def on_startup() -> None:
    run_migrations()
    generate_static_docs(app.openapi())


static_docs_dir = Path(__file__).resolve().parents[1] / "static-docs"
static_docs_dir.mkdir(parents=True, exist_ok=True)
app.mount("/static-docs", StaticFiles(directory=static_docs_dir, html=True), name="static-docs")


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/docs")


@app.get("/static-docs", include_in_schema=False)
def static_docs_root() -> RedirectResponse:
    return RedirectResponse(url="/static-docs/")


@app.get("/terms", response_model=list[TermRead])
def list_terms(db: Session = Depends(get_db)) -> list[TermRead]:
    return crud.list_terms(db)


@app.get("/terms/{keyword}", response_model=TermRead)
def get_term(keyword: str, db: Session = Depends(get_db)) -> TermRead:
    term = crud.get_term_by_keyword(db, keyword)
    if not term:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Term not found")
    return term


@app.post("/terms", response_model=TermRead, status_code=status.HTTP_201_CREATED)
def create_term(term_in: TermCreate, db: Session = Depends(get_db)) -> TermRead:
    existing = crud.get_term_by_keyword(db, term_in.keyword)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Term already exists")
    return crud.create_term(db, term_in)


@app.put("/terms/{keyword}", response_model=TermRead)
def update_term(keyword: str, term_in: TermUpdate, db: Session = Depends(get_db)) -> TermRead:
    term = crud.get_term_by_keyword(db, keyword)
    if not term:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Term not found")
    return crud.update_term(db, term, term_in)


@app.delete("/terms/{keyword}", status_code=status.HTTP_204_NO_CONTENT)
def delete_term(keyword: str, db: Session = Depends(get_db)) -> None:
    term = crud.get_term_by_keyword(db, keyword)
    if not term:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Term not found")
    crud.delete_term(db, term)
    return None
