"use client";

import type { RefObject } from "react";
import styles from "./Mindmap.module.scss";

type MindmapViewProps = {
  containerRef: RefObject<HTMLDivElement>;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  isControlsDisabled?: boolean;
};

export const MindmapView = ({
  containerRef,
  onZoomIn,
  onZoomOut,
  onFit,
  isControlsDisabled = false
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
            disabled={isControlsDisabled}
          >
            +
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={onZoomOut}
            aria-label="Отдалить"
            disabled={isControlsDisabled}
          >
            −
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={onFit}
            aria-label="Подогнать к экрану"
            disabled={isControlsDisabled}
          >
            Fit
          </button>
        </div>
        <div className={styles.cyCanvas} ref={containerRef} />
      </div>
    </div>
  );
};
