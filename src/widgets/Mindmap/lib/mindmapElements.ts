import { TermSummary } from "@/shared/types/term";

export const buildMindmapElements = (terms: TermSummary[]) => {
  const seen = new Set<string>();
  const nodeIds = new Set(terms.map((term) => term.keyword));
  const nodes = terms.map((term) => ({
    data: {
      id: term.keyword,
      label: term.title
    }
  }));
  const edges = terms.flatMap((term) =>
    term.related.flatMap((relatedId) => {
      if (!nodeIds.has(relatedId)) {
        return [];
      }
      const edgeId = [term.keyword, relatedId].sort().join("-");
      if (seen.has(edgeId)) {
        return [];
      }
      seen.add(edgeId);
      return [
        {
          data: {
            id: edgeId,
            source: term.keyword,
            target: relatedId
          }
        }
      ];
    })
  );

  return [...nodes, ...edges];
};
