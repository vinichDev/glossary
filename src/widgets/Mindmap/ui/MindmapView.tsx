"use client";

import type { RefObject } from "react";
import styles from "./Mindmap.module.scss";

type MindmapViewProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
};

export const MindmapView = ({
  containerRef,
  onZoomIn,
  onZoomOut,
  onFit
}: MindmapViewProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Mindmap терминов</h2>
          <p className={styles.subtitle}>Нажмите на узел, чтобы открыть карточку.</p>
        </div>
      </div>
      <div className={styles.canvas}>
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            type="button"
            onClick={onZoomIn}
            aria-label="Приблизить"
          >
            +
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={onZoomOut}
            aria-label="Отдалить"
          >
            −
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={onFit}
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
