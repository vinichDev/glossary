"use client";

import { memo, useCallback } from "react";
import type { MouseEvent } from "react";
import classNames from "classnames";
import styles from "./TermList.module.scss";
import { TermSummary } from "@/shared/types/term";

type TermListProps = {
  terms: TermSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export const TermList = memo(
  ({ terms, selectedId, onSelect }: TermListProps) => {
    const handleSelect = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.termId;
        if (id) {
          onSelect(id);
        }
      },
      [onSelect]
    );

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
                  [styles.listItemActive]: term.id === selectedId
                })}
                onClick={handleSelect}
                data-term-id={term.id}
                type="button"
              >
                <span className={styles.listItemTitle}>{term.title}</span>
                <span className={styles.listItemHint}>Открыть карточку</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
