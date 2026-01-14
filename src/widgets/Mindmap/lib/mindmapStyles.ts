import type { Stylesheet } from "cytoscape";

import { NODE_HEIGHT, NODE_WIDTH } from "./mindmapConfig";

export const resolveCssVar = (name: string, fallback: string) => {
  if (typeof window === "undefined") {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
};

export const createMindmapStyles = (): Stylesheet[] => [
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
    selector: ".edge-selected.edge-hovered",
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
