"use client";

import classNames from "classnames";
import styles from "./TermList.module.scss";
import { Term } from "@/shared/types/term";

type TermListProps = {
  terms: Term[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export const TermList = ({ terms, selectedId, onSelect }: TermListProps) => {
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
              onClick={() => onSelect(term.id)}
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
};
