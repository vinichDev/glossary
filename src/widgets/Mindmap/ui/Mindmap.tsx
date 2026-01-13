"use client";

import { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge
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
  const nodes = useMemo<Node[]>(() => {
    return terms.map((term) => ({
      id: term.id,
      position: { x: 0, y: 0 },
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
            type: "smoothstep"
          }
        ];
      })
    );
  }, [terms]);

  const layoutedNodes = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );

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
        <ReactFlow
          nodes={layoutedNodes}
          edges={edges}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          onNodeClick={(_, node) => onSelect(node.id)}
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
