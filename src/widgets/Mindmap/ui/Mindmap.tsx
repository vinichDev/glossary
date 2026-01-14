"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import type { Core } from "cytoscape";
import type { TermSummary } from "@/shared/types/term";
import { MindmapView } from "@/widgets/Mindmap/ui/MindmapView";
import { useMindmapElements } from "@/widgets/Mindmap/model/useMindmapElements";
import { useMindmapControls } from "@/widgets/Mindmap/model/useMindmapControls";
import { useMindmapInstance } from "@/widgets/Mindmap/model/useMindmapInstance";
import { useMindmapSelection } from "@/widgets/Mindmap/model/useMindmapSelection";

type MindmapProps = {
  terms: TermSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export const Mindmap = memo(({ terms, selectedId, onSelect }: MindmapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectionSyncRef = useRef<(cy: Core, id: string | null) => void>(() => {
    return;
  });

  const handleSelectionSync = useCallback(
    (cyInstance: Core, nextId: string | null) => {
      selectionSyncRef.current(cyInstance, nextId);
    },
    []
  );

  const { cyRef } = useMindmapInstance({
    containerRef,
    onSelect,
    onSelectionSync: handleSelectionSync
  });

  const { elements } = useMindmapElements({ terms, cyRef });
  const { applySelectionClasses } = useMindmapSelection({
    cyRef,
    selectedId,
    deps: [elements]
  });
  const { handleZoomIn, handleZoomOut, handleFit } = useMindmapControls({
    cyRef
  });

  useEffect(() => {
    selectionSyncRef.current = applySelectionClasses;
  }, [applySelectionClasses]);

  return (
    <MindmapView
      containerRef={containerRef}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onFit={handleFit}
    />
  );
});
