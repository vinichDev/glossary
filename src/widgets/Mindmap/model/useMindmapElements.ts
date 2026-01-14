"use client";

import { useEffect, useMemo } from "react";
import type { RefObject } from "react";
import type { Core } from "cytoscape";
import type { TermSummary } from "@/shared/types/term";
import { buildMindmapElements } from "@/widgets/Mindmap/lib/mindmapElements";
import { FIT_PADDING, LAYOUT_OPTIONS } from "@/widgets/Mindmap/lib/mindmapConfig";

type UseMindmapElementsParams = {
  terms: TermSummary[];
  cyRef: RefObject<Core | null>;
};

export const useMindmapElements = ({ terms, cyRef }: UseMindmapElementsParams) => {
  const elements = useMemo(() => buildMindmapElements(terms), [terms]);

  useEffect(() => {
    if (!cyRef.current) {
      return;
    }
    const cyInstance = cyRef.current;
    cyInstance.elements().remove();
    cyInstance.add(elements);
    cyInstance.layout(LAYOUT_OPTIONS).run();
    cyInstance.fit(undefined, FIT_PADDING);
  }, [cyRef, elements]);

  return { elements };
};
