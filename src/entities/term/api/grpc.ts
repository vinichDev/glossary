import { Term, TermSummary } from "@/shared/types/term";
import { getGlossaryClient, type GrpcError } from "@/shared/api/grpcClient";
import type { TermPayload } from "@/entities/term/model/types";

type TermMessage = {
  keyword: string;
  title: string;
  description: string;
  source: string;
  source_url: string;
  related: string[];
};

type GlossaryClient = {
  ListTerms: (
    request: Record<string, never>,
    callback: (error: GrpcError | null, response?: { terms: TermMessage[] }) => void
  ) => void;
  GetTerm: (
    request: { keyword: string },
    callback: (error: GrpcError | null, response?: { term: TermMessage }) => void
  ) => void;
  CreateTerm: (
    request: { term: Record<string, unknown> },
    callback: (error: GrpcError | null, response?: { term: TermMessage }) => void
  ) => void;
  UpdateTerm: (
    request: { keyword: string; term: Record<string, unknown> },
    callback: (error: GrpcError | null, response?: { term: TermMessage }) => void
  ) => void;
  DeleteTerm: (
    request: { keyword: string },
    callback: (error: GrpcError | null) => void
  ) => void;
};

const getTypedClient = () => getGlossaryClient() as unknown as GlossaryClient;

const mapTerm = (term: TermMessage): Term => ({
  keyword: term.keyword,
  title: term.title,
  description: term.description,
  source: term.source,
  sourceUrl: term.source_url,
  related: term.related ?? []
});

export const mapGrpcError = (error: GrpcError) => {
  switch (error.code) {
    case 3:
      return { status: 400, message: error.message };
    case 5:
      return { status: 404, message: error.message };
    case 6:
      return { status: 409, message: error.message };
    default:
      return { status: 500, message: "gRPC error" };
  }
};

export const listTerms = async (): Promise<TermSummary[]> => {
  const client = getTypedClient();

  const response = await new Promise<{ terms: TermMessage[] }>((resolve, reject) => {
    client.ListTerms({}, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data ?? { terms: [] });
    });
  });

  return (response.terms ?? []).map((term) => ({
    keyword: term.keyword,
    title: term.title,
    related: term.related ?? []
  }));
};

export const getTerm = async (keyword: string): Promise<Term | null> => {
  const client = getTypedClient();

  const response = await new Promise<{ term: TermMessage | null }>((resolve, reject) => {
    client.GetTerm({ keyword }, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data?.term ? { term: data.term } : { term: null });
    });
  });

  return response.term ? mapTerm(response.term) : null;
};

export const createTerm = async (
  payload: Partial<TermPayload>
): Promise<Term | null> => {
  const client = getTypedClient();

  const legacySourceUrl = (payload as { source_url?: string }).source_url;
  const requestPayload = {
    term: {
      keyword: payload.keyword ?? "",
      title: payload.title ?? "",
      description: payload.description ?? "",
      source: payload.source ?? "",
      source_url: payload.sourceUrl ?? legacySourceUrl ?? "",
      sourceUrl: payload.sourceUrl ?? legacySourceUrl ?? "",
      related: payload.related ?? []
    }
  };

  const response = await new Promise<{ term: TermMessage | null }>((resolve, reject) => {
    client.CreateTerm(requestPayload, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data?.term ? { term: data.term } : { term: null });
    });
  });

  return response.term ? mapTerm(response.term) : null;
};

export const updateTerm = async (
  keyword: string,
  payload: Partial<Omit<TermPayload, "keyword">>
): Promise<Term | null> => {
  const client = getTypedClient();

  const related = payload.related;
  const legacySourceUrl = (payload as { source_url?: string }).source_url;
  const requestPayload = {
    keyword,
    term: {
      title: payload.title ?? "",
      description: payload.description ?? "",
      source: payload.source ?? "",
      source_url: payload.sourceUrl ?? legacySourceUrl ?? "",
      sourceUrl: payload.sourceUrl ?? legacySourceUrl ?? "",
      related: related ?? [],
      clear_related: Array.isArray(related) && related.length === 0
    }
  };

  const response = await new Promise<{ term: TermMessage | null }>((resolve, reject) => {
    client.UpdateTerm(requestPayload, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data?.term ? { term: data.term } : { term: null });
    });
  });

  return response.term ? mapTerm(response.term) : null;
};

export const deleteTerm = async (keyword: string): Promise<void> => {
  const client = getTypedClient();

  await new Promise<void>((resolve, reject) => {
    client.DeleteTerm({ keyword }, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};
