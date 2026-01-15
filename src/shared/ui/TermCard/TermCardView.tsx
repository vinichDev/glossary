"use client";

import type { MouseEvent, ReactNode } from "react";
import classNames from "classnames";
import styles from "./TermCard.module.scss";
import type { Term, TermSummary } from "@/shared/types/term";

type TermCardViewProps = {
  term: Term | null;
  relatedTerms: TermSummary[];
  onRelatedSelect: (event: MouseEvent<HTMLButtonElement>) => void;
  isRelatedDisabled?: boolean;
  isSourceDisabled?: boolean;
  tutorialRelatedBubble?: ReactNode;
};

export const TermCardView = ({
  term,
  relatedTerms,
  onRelatedSelect,
  isRelatedDisabled = false,
  isSourceDisabled = false,
  tutorialRelatedBubble
}: TermCardViewProps) => {
  if (!term) {
    return (
      <div className={classNames(styles.card, styles.cardEmpty)}>
        <p className={styles.cardHint}>Выберите термин в списке или на mindmap.</p>
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
        <div
          className={classNames(styles.relatedBlock, {
            [styles.relatedBlockWithBubble]: tutorialRelatedBubble
          })}
        >
          <h3 className={styles.relatedTitle}>Связанные термины</h3>
          <div className={styles.relatedList}>
            {relatedTerms.map((related) => (
              <button
                className={classNames(styles.relatedButton, {
                  [styles.relatedButtonDisabled]: isRelatedDisabled
                })}
                type="button"
                key={related.id}
                data-term-id={related.id}
                onClick={onRelatedSelect}
                disabled={isRelatedDisabled}
              >
                {related.title}
              </button>
            ))}
          </div>
          {tutorialRelatedBubble}
        </div>
      )}
      {term.sourceUrl && term.source && (
        <a
          className={classNames(styles.cardSource, {
            [styles.cardSourceDisabled]: isSourceDisabled
          })}
          href={term.sourceUrl}
          target="_blank"
          rel="noreferrer"
          aria-disabled={isSourceDisabled}
          tabIndex={isSourceDisabled ? -1 : 0}
          onClick={(event) => {
            if (isSourceDisabled) {
              event.preventDefault();
            }
          }}
        >
          Источник: {term.source}
        </a>
      )}
    </div>
  );
};
