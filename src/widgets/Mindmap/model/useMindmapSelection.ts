"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import type { Core } from "cytoscape";

type UseMindmapSelectionParams = {
  cyRef: RefObject<Core | null>;
  selectedId: string | null;
  deps?: unknown[];
};

export const useMindmapSelection = ({
  cyRef,
  selectedId,
  deps = []
}: UseMindmapSelectionParams) => {
  const previousSelectedIdRef = useRef<string | null>(null);

  const applySelectionClasses = useCallback(
    (cyInstance: Core, nextId: string | null) => {
      const updateSelectionClasses = (
        id: string | null,
        action: "addClass" | "removeClass"
      ) => {
        if (!id) {
          return;
        }
        const node = cyInstance.getElementById(id);
        if (node.length === 0) {
          return;
        }
        node[action]("node-active");
        node.connectedEdges()[action]("edge-selected");
      };

      const previousId = previousSelectedIdRef.current;
      const hasSelectionChange = previousId !== nextId;
      const hoveredEdges = cyInstance.edges(".edge-hovered");
      const shouldClearHover = hoveredEdges.length > 0;

      if (!hasSelectionChange && !shouldClearHover) {
        return;
      }

      cyInstance.batch(() => {
        if (shouldClearHover) {
          hoveredEdges.removeClass("edge-hovered");
        }

        if (previousId && previousId !== nextId) {
          updateSelectionClasses(previousId, "removeClass");
        }

        if (nextId) {
          updateSelectionClasses(nextId, "addClass");
        } else if (previousId) {
          updateSelectionClasses(previousId, "removeClass");
        }

        previousSelectedIdRef.current = nextId;
      });

      cyInstance.emit("render");
    },
    []
  );

  useLayoutEffect(() => {
    if (!cyRef.current) {
      return;
    }
    applySelectionClasses(cyRef.current, selectedId);
  }, [applySelectionClasses, cyRef, selectedId, ...deps]);

  return { applySelectionClasses };
};
