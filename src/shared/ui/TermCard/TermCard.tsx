import { memo, useCallback } from "react";
import type { MouseEvent } from "react";
import classNames from "classnames";
import styles from "./TermCard.module.scss";
import { Term, TermSummary } from "@/shared/types/term";

type TermCardProps = {
  term: Term | null;
  relatedTerms: TermSummary[];
  onRelatedSelect: (id: string) => void;
};

export const TermCard = memo(
  ({ term, relatedTerms, onRelatedSelect }: TermCardProps) => {
    const handleRelatedSelect = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.termId;
        if (id) {
          onRelatedSelect(id);
        }
      },
      [onRelatedSelect]
    );

    if (!term) {
      return (
        <div className={classNames(styles.card, styles.cardEmpty)}>
          <p className={styles.cardHint}>
            Выберите термин в списке или на mindmap.
          </p>
        </div>
      );
    }

    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{term.title}</h2>
        </div>
        <p className={styles.cardDescription}>{term.description}</p>
        {relatedTerms.length > 0 && (
          <div className={styles.relatedBlock}>
            <h3 className={styles.relatedTitle}>Связанные термины</h3>
            <div className={styles.relatedList}>
              {relatedTerms.map((related) => (
                <button
                  className={styles.relatedButton}
                  type="button"
                  key={related.id}
                  data-term-id={related.id}
                  onClick={handleRelatedSelect}
                >
                  {related.title}
                </button>
              ))}
            </div>
          </div>
        )}
        {term.sourceUrl && term.source && (
          <a
            className={styles.cardSource}
            href={term.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Источник: {term.source}
          </a>
        )}
      </div>
    );
  }
);
