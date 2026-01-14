import { Term } from "@/shared/types/term";

type TermApiResponse = {
  data: Term;
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
