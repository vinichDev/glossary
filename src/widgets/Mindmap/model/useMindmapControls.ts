"use client";

import { useCallback } from "react";
import type { RefObject } from "react";
import type { Core } from "cytoscape";
import {
  FIT_PADDING,
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_IN_FACTOR,
  ZOOM_OUT_FACTOR
} from "@/widgets/Mindmap/lib/mindmapConfig";

type UseMindmapControlsParams = {
  cyRef: RefObject<Core | null>;
};

export const useMindmapControls = ({ cyRef }: UseMindmapControlsParams) => {
  const handleZoomIn = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    const nextZoom = Math.min(cy.zoom() * ZOOM_IN_FACTOR, MAX_ZOOM);
    cy.zoom(nextZoom);
  }, [cyRef]);

  const handleZoomOut = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    const nextZoom = Math.max(cy.zoom() * ZOOM_OUT_FACTOR, MIN_ZOOM);
    cy.zoom(nextZoom);
  }, [cyRef]);

  const handleFit = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    cy.fit(undefined, FIT_PADDING);
  }, [cyRef]);

  return { handleZoomIn, handleZoomOut, handleFit };
};
