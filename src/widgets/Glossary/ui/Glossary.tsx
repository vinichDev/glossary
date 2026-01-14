"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Glossary.module.scss";
import { termSummaries } from "@/shared/data/termSummaries";
import { TermList } from "@/entities/term/ui/TermList";
import { Mindmap } from "@/widgets/Mindmap/ui/Mindmap";
import { Term } from "@/shared/types/term";
import { fetchTermById } from "@/widgets/Glossary/lib/glossaryApi";
import {
  CARD_LOADING_MESSAGE,
  GLOSSARY_REPO_URL,
  LOADING_TERM
} from "@/widgets/Glossary/lib/glossaryConfig";
import {
  buildTermSummaryMap,
  getRelatedTerms
} from "@/widgets/Glossary/lib/glossaryTerms";

const TermCard = dynamic(
  () => import("@/shared/ui/TermCard/TermCard").then((mod) => mod.TermCard),
  {
    loading: () => (
      <div className={styles.cardLoading}>{CARD_LOADING_MESSAGE}</div>
    )
  }
);

export const Glossary = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  const handleCloseCard = useCallback(() => {
    setIsCardOpen(false);
  }, []);

  const termSummaryMap = useMemo(() => {
    return buildTermSummaryMap(termSummaries);
  }, []);

  const relatedTerms = useMemo(() => {
    return getRelatedTerms(selectedTerm, termSummaryMap);
  }, [selectedTerm, termSummaryMap]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedTerm(null);
      setIsCardOpen(false);
      return;
    }

    const controller = new AbortController();
    setSelectedTerm(null);
    setIsLoading(true);
    setIsCardOpen(true);

    fetchTermById(selectedId, controller.signal)
      .then((term) => {
        setSelectedTerm(term);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setSelectedTerm(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [selectedId]);

  useEffect(() => {
    if (!cardRef.current || !isCardOpen) {
      return;
    }
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isCardOpen, selectedTerm]);

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
        <Mindmap
          terms={termSummaries}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </section>

      <section className={styles.listSection}>
        <div className={styles.listGrid}>
          <TermList
            terms={termSummaries}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
      </section>

      {isCardOpen && (
        <div className={styles.cardOverlay} role="dialog" aria-modal="true">
          <div className={styles.cardBackdrop} onClick={handleCloseCard} />
          <div className={styles.cardWrapper} ref={cardRef}>
            <button
              className={styles.cardClose}
              type="button"
              onClick={handleCloseCard}
            >
              Закрыть
            </button>
            <TermCard
              term={
                isLoading ? LOADING_TERM : selectedTerm
              }
              relatedTerms={relatedTerms}
              onRelatedSelect={handleSelect}
            />
          </div>
        </div>
      )}
    </main>
  );
};
