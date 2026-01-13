import classNames from "classnames";
import styles from "./TermCard.module.scss";
import { Term } from "@/shared/types/term";

type TermCardProps = {
  term: Term | null;
};

export const TermCard = ({ term }: TermCardProps) => {
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
