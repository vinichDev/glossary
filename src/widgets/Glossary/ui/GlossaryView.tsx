"use client";

import dynamic from "next/dynamic";
import styles from "./Glossary.module.scss";
import { TermList } from "@/entities/term/ui/TermList";
import { Mindmap } from "@/widgets/Mindmap/ui/Mindmap";
import type { RefObject } from "react";
import type { Term, TermSummary } from "@/shared/types/term";
import {
  CARD_LOADING_MESSAGE,
  GLOSSARY_REPO_URL,
  LOADING_TERM
} from "@/widgets/Glossary/lib/glossaryConfig";

const TermCard = dynamic(
  () => import("@/shared/ui/TermCard/TermCard").then((mod) => mod.TermCard),
  {
    loading: () => (
      <div className={styles.cardLoading}>{CARD_LOADING_MESSAGE}</div>
    )
  }
);

type GlossaryViewProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  isCardOpen: boolean;
  isLoading: boolean;
  relatedTerms: TermSummary[];
  selectedId: string | null;
  selectedTerm: Term | null;
  termSummaries: TermSummary[];
  onCloseCard: () => void;
  onSelect: (id: string) => void;
};

export const GlossaryView = ({
  cardRef,
  isCardOpen,
  isLoading,
  relatedTerms,
  selectedId,
  selectedTerm,
  termSummaries,
  onCloseCard,
  onSelect
}: GlossaryViewProps) => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Глоссарий терминов</h1>
          <a
            className={styles.repoLink}
            href={GLOSSARY_REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            Репозиторий на GitHub
          </a>
        </div>
        <Mindmap terms={termSummaries} selectedId={selectedId} onSelect={onSelect} />
      </section>

      <section className={styles.listSection}>
        <div className={styles.listGrid}>
          <TermList terms={termSummaries} selectedId={selectedId} onSelect={onSelect} />
        </div>
      </section>

      {isCardOpen && (
        <div className={styles.cardOverlay} role="dialog" aria-modal="true">
          <div className={styles.cardBackdrop} onClick={onCloseCard} />
          <div className={styles.cardWrapper} ref={cardRef}>
            <button className={styles.cardClose} type="button" onClick={onCloseCard}>
              Закрыть
            </button>
            <TermCard
              term={isLoading ? LOADING_TERM : selectedTerm}
              relatedTerms={relatedTerms}
              onRelatedSelect={onSelect}
            />
          </div>
        </div>
      )}
    </main>
  );
};
