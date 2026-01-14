"use client";

import { useEffect, useMemo, useRef } from "react";
import cytoscape, { Core } from "cytoscape";
import dagre from "cytoscape-dagre";

import styles from "./Mindmap.module.scss";
import { TermSummary } from "@/shared/types/term";
import {
  FIT_PADDING,
  LAYOUT_OPTIONS,
  MAX_ZOOM,
  MIN_ZOOM,
  WHEEL_SENSITIVITY,
  ZOOM_IN_FACTOR,
  ZOOM_OUT_FACTOR
} from "../lib/mindmapConfig";
import { buildMindmapElements } from "../lib/mindmapElements";
import { createMindmapStyles } from "../lib/mindmapStyles";

type MindmapProps = {
  terms: TermSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

let isDagreRegistered = false;

export const Mindmap = ({ terms, selectedId, onSelect }: MindmapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const onSelectRef = useRef(onSelect);
  const previousSelectedIdRef = useRef<string | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const elements = useMemo(() => buildMindmapElements(terms), [terms]);

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
      onSelectRef.current(event.target.id());
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
  }, []);

  useEffect(() => {
    if (!cyRef.current) {
      return;
    }
    const cyInstance = cyRef.current;
    cyInstance.elements().remove();
    cyInstance.add(elements);
    cyInstance.layout(LAYOUT_OPTIONS).run();
    cyInstance.fit(undefined, FIT_PADDING);
  }, [elements]);

  useEffect(() => {
    if (!cyRef.current) {
      return;
    }
    const cyInstance = cyRef.current;

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
    if (previousId && previousId !== selectedId) {
      updateSelectionClasses(previousId, "removeClass");
    }

    if (selectedId) {
      updateSelectionClasses(selectedId, "addClass");
    } else if (previousId) {
      updateSelectionClasses(previousId, "removeClass");
    }

    previousSelectedIdRef.current = selectedId;
  }, [selectedId, elements]);

  const handleZoomIn = () => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    const nextZoom = Math.min(cy.zoom() * ZOOM_IN_FACTOR, MAX_ZOOM);
    cy.zoom(nextZoom);
  };

  const handleZoomOut = () => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    const nextZoom = Math.max(cy.zoom() * ZOOM_OUT_FACTOR, MIN_ZOOM);
    cy.zoom(nextZoom);
  };

  const handleFit = () => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    cy.fit(undefined, FIT_PADDING);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Mindmap терминов</h2>
          <p className={styles.subtitle}>
            Нажмите на узел, чтобы открыть карточку.
          </p>
        </div>
      </div>
      <div className={styles.canvas}>
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            type="button"
            onClick={handleZoomIn}
            aria-label="Приблизить"
          >
            +
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={handleZoomOut}
            aria-label="Отдалить"
          >
            −
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={handleFit}
            aria-label="Подогнать к экрану"
          >
            Fit
          </button>
        </div>
        <div className={styles.cyCanvas} ref={containerRef} />
      </div>
    </div>
  );
};
