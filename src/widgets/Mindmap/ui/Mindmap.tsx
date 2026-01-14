"use client";

import { useEffect, useMemo, useRef } from "react";
import cytoscape, { Core, Stylesheet } from "cytoscape";
import dagre from "cytoscape-dagre";

import styles from "./Mindmap.module.scss";
import { TermSummary } from "@/shared/types/term";

type MindmapProps = {
  terms: TermSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const NODE_WIDTH = 150;
const NODE_HEIGHT = 40;

let isDagreRegistered = false;

const LAYOUT_OPTIONS = {
  name: "dagre",
  rankDir: "TB",
  nodeSep: 40,
  rankSep: 60,
  ranker: "tight-tree",
  padding: 20,
  fit: true
};

export const Mindmap = ({ terms, selectedId, onSelect }: MindmapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const elements = useMemo(() => {
    const seen = new Set<string>();
    const nodeIds = new Set(terms.map((term) => term.id));
    const nodes = terms.map((term) => ({
      data: {
        id: term.id,
        label: term.title
      }
    }));
    const edges = terms.flatMap((term) =>
      term.related.flatMap((relatedId) => {
        if (!nodeIds.has(relatedId)) {
          return [];
        }
        const edgeId = [term.id, relatedId].sort().join("-");
        if (seen.has(edgeId)) {
          return [];
        }
        seen.add(edgeId);
        return [
          {
            data: {
              id: edgeId,
              source: term.id,
              target: relatedId
            }
          }
        ];
      })
    );

    return [...nodes, ...edges];
  }, [terms]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (!isDagreRegistered) {
      cytoscape.use(dagre);
      isDagreRegistered = true;
    }

    const resolveCssVar = (name: string, fallback: string) => {
      if (typeof window === "undefined") {
        return fallback;
      }
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return value || fallback;
    };

    const cyStyles: Stylesheet[] = [
      {
        selector: "node",
        style: {
          label: "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
          "background-color": resolveCssVar(
            "--color-surface-strong",
            "#0f172a"
          ),
          "border-color": resolveCssVar("--color-border-strong", "#1e293b"),
          "border-width": 1,
          color: resolveCssVar("--color-text", "#e2e8f0"),
          "font-size": 12,
          "font-weight": "600",
          "text-wrap": "wrap",
          "text-max-width": NODE_WIDTH - 16,
          shape: "round-rectangle"
        }
      },
      {
        selector: "edge",
        style: {
          "line-color": resolveCssVar("--color-edge", "#64748b"),
          width: 2,
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          "target-arrow-color": resolveCssVar("--color-edge", "#64748b"),
          "source-arrow-shape": "circle",
          "source-arrow-color": resolveCssVar("--color-edge", "#64748b"),
          "arrow-scale": 0.8
        }
      },
      {
        selector: ".node-active",
        style: {
          "border-color": resolveCssVar("--color-accent", "#38bdf8"),
          "border-width": 2,
          "shadow-blur": 8,
          "shadow-color": resolveCssVar("--color-accent-glow", "#38bdf8"),
          "shadow-opacity": 0.5
        }
      },
      {
        selector: ".edge-selected",
        style: {
          "line-color": resolveCssVar("--color-warning", "#f59e0b"),
          width: 3,
          "target-arrow-color": resolveCssVar("--color-warning", "#f59e0b"),
          "source-arrow-color": resolveCssVar("--color-warning", "#f59e0b")
        }
      },
      {
        selector: ".edge-hovered",
        style: {
          "line-color": resolveCssVar("--color-accent", "#38bdf8"),
          width: 3,
          "target-arrow-color": resolveCssVar("--color-accent", "#38bdf8"),
          "source-arrow-color": resolveCssVar("--color-accent", "#38bdf8")
        }
      }
    ];

    const cyInstance = cytoscape({
      container: containerRef.current,
      elements: [],
      style: cyStyles,
      layout: LAYOUT_OPTIONS,
      minZoom: 0.2,
      maxZoom: 2,
      wheelSensitivity: 0.2
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
    cyInstance.fit(undefined, 20);
  }, [elements]);

  useEffect(() => {
    if (!cyRef.current) {
      return;
    }
    const cyInstance = cyRef.current;
    cyInstance.nodes().removeClass("node-active");
    cyInstance.edges().removeClass("edge-selected");

    if (!selectedId) {
      return;
    }
    const selectedNode = cyInstance.getElementById(selectedId);
    if (selectedNode) {
      selectedNode.addClass("node-active");
      selectedNode.connectedEdges().addClass("edge-selected");
    }
  }, [selectedId, elements]);

  const handleZoomIn = () => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    const nextZoom = Math.min(cy.zoom() * 1.2, 2);
    cy.zoom(nextZoom);
  };

  const handleZoomOut = () => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    const nextZoom = Math.max(cy.zoom() * 0.8, 0.2);
    cy.zoom(nextZoom);
  };

  const handleFit = () => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    cy.fit(undefined, 20);
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
