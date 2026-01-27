import { Term, TermSummary } from "@/shared/types/term";

type TermApiResponse = {
  data: Term;
};

type TermSummariesApiResponse = {
  data: TermSummary[];
};

export const fetchTermSummaries = async (
  signal?: AbortSignal
): Promise<TermSummary[]> => {
  const response = await fetch("/api/terms", { signal });

  if (!response.ok) {
    throw new Error("Не удалось загрузить список терминов");
  }

  const payload: TermSummariesApiResponse = await response.json();

  return payload.data;
};

export const fetchTermById = async (
  id: string,
  signal?: AbortSignal
): Promise<Term> => {
  const response = await fetch(`/api/terms/${id}`, { signal });

  if (!response.ok) {
    throw new Error("Не удалось загрузить термин");
  }

  const payload: TermApiResponse = await response.json();

  return payload.data;
};
