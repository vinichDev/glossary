from datetime import datetime

from pydantic import AliasChoices, BaseModel, Field


class TermBase(BaseModel):
    keyword: str = Field(..., min_length=2, max_length=120)
    title: str = Field(..., min_length=2, max_length=200)
    description: str = Field(..., min_length=3)
    source: str = Field(..., min_length=2, max_length=200)
    source_url: str = Field(
        ...,
        min_length=5,
        max_length=500,
        serialization_alias="sourceUrl",
        validation_alias=AliasChoices("sourceUrl", "source_url"),
    )
    related: list[str] = Field(default_factory=list)


class TermCreate(TermBase):
    pass


class TermUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=200)
    description: str | None = Field(default=None, min_length=3)
    source: str | None = Field(default=None, min_length=2, max_length=200)
    source_url: str | None = Field(
        default=None,
        min_length=5,
        max_length=500,
        serialization_alias="sourceUrl",
        validation_alias=AliasChoices("sourceUrl", "source_url"),
    )
    related: list[str] | None = None


class TermRead(TermBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True
