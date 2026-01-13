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

import styles from "./Mindmap.module.scss";
import { Term } from "@/shared/types/term";

type MindmapProps = {
  terms: Term[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const getNodePositions = (count: number) => {
  const radius = 180;
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  });
};

export const Mindmap = ({ terms, selectedId, onSelect }: MindmapProps) => {
  const nodes = useMemo<Node[]>(() => {
    const positions = getNodePositions(terms.length);
    return terms.map((term, index) => ({
      id: term.id,
      position: positions[index],
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
          nodes={nodes}
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
