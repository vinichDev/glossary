"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import cytoscape, { Core } from "cytoscape";
import dagre from "cytoscape-dagre";
import {
  LAYOUT_OPTIONS,
  MAX_ZOOM,
  MIN_ZOOM,
  WHEEL_SENSITIVITY
} from "@/widgets/Mindmap/lib/mindmapConfig";
import { createMindmapStyles } from "@/widgets/Mindmap/lib/mindmapStyles";

let isDagreRegistered = false;

type UseMindmapInstanceParams = {
  containerRef: RefObject<HTMLDivElement | null>;
  onSelect: (id: string) => void;
  onSelectionSync: (cyInstance: Core, nextId: string | null) => void;
};

export const useMindmapInstance = ({
  containerRef,
  onSelect,
  onSelectionSync
}: UseMindmapInstanceParams) => {
  const cyRef = useRef<Core | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (!isDagreRegistered) {
      cytoscape.use(dagre);
      isDagreRegistered = true;
    }

    const cyStyles = createMindmapStyles();

    const cyInstance = cytoscape({
      container: containerRef.current,
      elements: [],
      style: cyStyles,
      layout: LAYOUT_OPTIONS,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      wheelSensitivity: WHEEL_SENSITIVITY
    });

    cyInstance.on("tap", "node", (event) => {
      const nextId = event.target.id();
      onSelectionSync(cyInstance, nextId);

      if (typeof window === "undefined") {
        onSelectRef.current(nextId);
        return;
      }

      window.requestAnimationFrame(() => {
        onSelectRef.current(nextId);
      });
    });

    cyInstance.on("mouseover", "node", (event) => {
      event.target.connectedEdges().addClass("edge-hovered");
    });

    cyInstance.on("mouseout", "node", (event) => {
      event.target.connectedEdges().removeClass("edge-hovered");
    });

    cyRef.current = cyInstance;

    return () => {
      cyInstance.destroy();
      cyRef.current = null;
    };
  }, [containerRef, onSelectionSync]);

  return { cyRef };
};
