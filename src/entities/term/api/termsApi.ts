import { Term, TermSummary } from "@/shared/types/term";
import type { TermPayload } from "@/entities/term/model/types";

type TermApiResponse = {
  data: Term;
};

type TermSummariesResponse = {
  data: TermSummary[];
};

export const fetchTerms = async (
  signal?: AbortSignal
): Promise<TermSummary[]> => {
  const response = await fetch(`/api/terms`, { signal });

  if (!response.ok) {
    throw new Error("Не удалось загрузить список терминов");
  }

  const payload: TermSummariesResponse = await response.json();

  return payload.data;
};

export const fetchTermByKeyword = async (
  keyword: string,
  signal?: AbortSignal
): Promise<Term> => {
  const response = await fetch(`/api/terms/${keyword}`, { signal });

  if (!response.ok) {
    throw new Error("Не удалось загрузить термин");
  }

  const payload: TermApiResponse = await response.json();

  return payload.data;
};

export const createTerm = async (payload: TermPayload): Promise<Term> => {
  const response = await fetch(`/api/terms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Не удалось создать термин");
  }

  const data: TermApiResponse = await response.json();
  return data.data;
};

export const updateTerm = async (
  keyword: string,
  payload: Omit<TermPayload, "keyword">
): Promise<Term> => {
  const response = await fetch(`/api/terms/${keyword}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Не удалось обновить термин");
  }

  const data: TermApiResponse = await response.json();
  return data.data;
};

export const deleteTerm = async (keyword: string): Promise<void> => {
  const response = await fetch(`/api/terms/${keyword}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Не удалось удалить термин");
  }
};
