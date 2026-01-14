import { Term, TermSummary } from "@/shared/types/term";

export const buildTermSummaryMap = (
  summaries: TermSummary[]
): Record<string, TermSummary> => {
  return summaries.reduce<Record<string, TermSummary>>(
    (accumulator, term) => {
      accumulator[term.id] = term;
      return accumulator;
    },
    {}
  );
};

export const getRelatedTerms = (
  selectedTerm: Term | null,
  termSummaryMap: Record<string, TermSummary>
): TermSummary[] => {
  if (!selectedTerm) {
    return [];
  }

  return selectedTerm.related
    .map((relatedId) => termSummaryMap[relatedId])
    .filter(Boolean);
};
