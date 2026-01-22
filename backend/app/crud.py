from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Term
from app.schemas import TermCreate, TermUpdate


def list_terms(db: Session) -> list[Term]:
    return list(db.scalars(select(Term).order_by(Term.keyword)))


def get_term_by_keyword(db: Session, keyword: str) -> Term | None:
    return db.scalar(select(Term).where(Term.keyword == keyword))


def create_term(db: Session, term_in: TermCreate) -> Term:
    term = Term(
        keyword=term_in.keyword,
        title=term_in.title,
        description=term_in.description,
        source=term_in.source,
        source_url=term_in.source_url,
        related=term_in.related,
    )
    db.add(term)
    db.commit()
    db.refresh(term)
    return term


def update_term(db: Session, term: Term, term_in: TermUpdate) -> Term:
    if term_in.title is not None:
        term.title = term_in.title
    if term_in.description is not None:
        term.description = term_in.description
    if term_in.source is not None:
        term.source = term_in.source
    if term_in.source_url is not None:
        term.source_url = term_in.source_url
    if term_in.related is not None:
        term.related = term_in.related
    db.commit()
    db.refresh(term)
    return term


def delete_term(db: Session, term: Term) -> None:
    db.delete(term)
    db.commit()
