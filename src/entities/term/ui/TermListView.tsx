"use client";

import type { MouseEvent } from "react";
import classNames from "classnames";
import styles from "./TermList.module.scss";
import type { TermSummary } from "@/shared/types/term";

type TermListViewProps = {
  terms: TermSummary[];
  selectedId: string | null;
  onItemSelect: (event: MouseEvent<HTMLButtonElement>) => void;
  isInteractionDisabled?: boolean;
};

export const TermListView = ({
  terms,
  selectedId,
  onItemSelect,
  isInteractionDisabled = false
}: TermListViewProps) => {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.listHeader}>
        <h3 className={styles.listTitle}>Список терминов</h3>
        <span className={styles.listCount}>{terms.length} терминов</span>
      </div>
      <ul className={styles.list}>
        {terms.map((term) => (
          <li key={term.id}>
            <button
              className={classNames(styles.listItem, {
                [styles.listItemActive]: term.id === selectedId,
                [styles.listItemDisabled]: isInteractionDisabled
              })}
              onClick={onItemSelect}
              data-term-id={term.id}
              type="button"
              disabled={isInteractionDisabled}
            >
              <span className={styles.listItemTitle}>{term.title}</span>
              <span className={styles.listItemHint}>Открыть карточку</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
