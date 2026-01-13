import classNames from "classnames";
import styles from "./TermCard.module.scss";
import { Term, TermSummary } from "@/shared/types/term";

type TermCardProps = {
  term: Term | null;
  relatedTerms: TermSummary[];
  onRelatedSelect: (id: string) => void;
};

export const TermCard = ({
  term,
  relatedTerms,
  onRelatedSelect
}: TermCardProps) => {
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
        <div className={styles.relatedBlock}>
          <h3 className={styles.relatedTitle}>Связанные термины</h3>
          <div className={styles.relatedList}>
            {relatedTerms.map((related) => (
              <button
                className={styles.relatedButton}
                type="button"
                key={related.id}
                onClick={() => onRelatedSelect(related.id)}
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
};
