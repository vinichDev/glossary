"use client";

import { useEffect, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Position
} from "reactflow";
import "reactflow/dist/style.css";
import classNames from "classnames";
import dagre from "dagre";

import styles from "./Mindmap.module.scss";
import { Term } from "@/shared/types/term";

type MindmapProps = {
  terms: Term[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const NODE_WIDTH = 150;
const NODE_HEIGHT = 40;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: "LR",
    nodesep: 80,
    ranksep: 100
  });

  nodes.forEach((node) => {
    graph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  return nodes.map((node) => {
    const position = graph.node(node.id);
    return {
      ...node,
      position: {
        x: position.x - NODE_WIDTH / 2,
        y: position.y - NODE_HEIGHT / 2
      }
    };
  });
};

export const Mindmap = ({ terms, selectedId, onSelect }: MindmapProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const nodes = useMemo<Node[]>(() => {
    return terms.map((term) => ({
      id: term.id,
      position: { x: 0, y: 0 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: {
        label: term.title
      },
      className: classNames(styles.node, {
        [styles.nodeActive]: term.id === selectedId
      })
    }));
  }, [terms, selectedId]);

  const edges = useMemo<Edge[]>(() => {
    const seen = new Set<string>();
    return terms.flatMap((term) =>
      term.related.flatMap((relatedId) => {
        const edgeId = [term.id, relatedId].sort().join("-");
        if (seen.has(edgeId)) {
          return [];
        }
        seen.add(edgeId);
        return [
          {
            id: edgeId,
            source: term.id,
            target: relatedId,
            type: "smoothstep",
            pathOptions: { borderRadius: 24 },
            className: classNames(
              styles.edge,
              `edge-source-${term.id}`,
              `edge-target-${relatedId}`
            )
          }
        ];
      })
    );
  }, [terms]);

  const layoutedNodes = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );

  const clearEdgeClass = (className: string) => {
    if (!wrapperRef.current) {
      return;
    }
    const edgesToClear = wrapperRef.current.querySelectorAll<SVGGElement>(
      `.react-flow__edge.${className}`
    );
    edgesToClear.forEach((edgeElement) => {
      edgeElement.classList.remove(className);
    });
  };

  const highlightEdgesForId = (id: string, className: string) => {
    if (!wrapperRef.current) {
      return;
    }
    const edgesToHighlight = wrapperRef.current.querySelectorAll<SVGGElement>(
      `.react-flow__edge.edge-source-${id}, .react-flow__edge.edge-target-${id}`
    );
    edgesToHighlight.forEach((edgeElement) => {
      edgeElement.classList.add(className);
    });
  };

  useEffect(() => {
    clearEdgeClass("edge-selected");
    if (selectedId) {
      highlightEdgesForId(selectedId, "edge-selected");
    }
  }, [selectedId]);

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
      <div className={classNames(styles.canvas, styles.edgeHighlight)} ref={wrapperRef}>
        <ReactFlow
          nodes={layoutedNodes}
          edges={edges}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          onNodeClick={(_, node) => onSelect(node.id)}
          onNodeMouseEnter={(_, node) => {
            if (hoveredIdRef.current === node.id) {
              return;
            }
            if (hoveredIdRef.current) {
              clearEdgeClass("edge-hovered");
            }
            hoveredIdRef.current = node.id;
            highlightEdgesForId(node.id, "edge-hovered");
          }}
          onNodeMouseLeave={() => {
            if (!hoveredIdRef.current) {
              return;
            }
            clearEdgeClass("edge-hovered");
            hoveredIdRef.current = null;
          }}
        >
          <MiniMap
            nodeColor={() => "#38bdf8"}
            maskColor="rgba(15, 23, 42, 0.6)"
          />
          <Controls />
          <Background color="#334155" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};
