CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "related" TEXT[] NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Term_position_idx" ON "Term"("position");
