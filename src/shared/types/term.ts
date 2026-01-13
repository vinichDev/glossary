export type Term = {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  related: string[];
};

export type TermSummary = Pick<Term, "id" | "title" | "related">;
