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
  containerRef: RefObject<HTMLDivElement>;
  onSelect: (id: string) => void;
  onSelectionSync: (cyInstance: Core, nextId: string | null) => void;
  onNodeHover?: () => void;
  isInteractionLocked?: boolean;
};

export const useMindmapInstance = ({
  containerRef,
  onSelect,
  onSelectionSync,
  onNodeHover,
  isInteractionLocked = false
}: UseMindmapInstanceParams) => {
  const cyRef = useRef<Core | null>(null);
  const onSelectRef = useRef(onSelect);
  const onNodeHoverRef = useRef(onNodeHover);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    onNodeHoverRef.current = onNodeHover;
  }, [onNodeHover]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (!isDagreRegistered) {
      cytoscape.use(dagre);
      isDagreRegistered = true;
    }

    const cyInstance = cytoscape({
      container: containerRef.current,
      elements: [],
      style: createMindmapStyles(),
      layout: LAYOUT_OPTIONS,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      wheelSensitivity: WHEEL_SENSITIVITY
    });

    let isActive = true;
    const applyStyles = () => {
      if (!isActive || cyInstance.destroyed()) return;
      cyInstance.style(createMindmapStyles()).update();
    };


    applyStyles();
    const animationFrameId =
      typeof window !== "undefined"
        ? window.requestAnimationFrame(applyStyles)
        : null;

    const handleWindowLoad = () => applyStyles();

    if (typeof window !== "undefined") {
      window.addEventListener("load", handleWindowLoad);
    }

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
      onNodeHoverRef.current?.();
    });

    cyInstance.on("mouseout", "node", (event) => {
      event.target.connectedEdges().removeClass("edge-hovered");
    });

    cyRef.current = cyInstance;

    return () => {
      isActive = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleWindowLoad);
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
        }
      }
      cyInstance.destroy();
      cyRef.current = null;
    };
  }, [containerRef, onSelectionSync]);

  useEffect(() => {
    if (!cyRef.current) {
      return;
    }
    cyRef.current.userZoomingEnabled(!isInteractionLocked);
    cyRef.current.userPanningEnabled(!isInteractionLocked);
  }, [isInteractionLocked]);

  return { cyRef };
};
