"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Glossary.module.scss";
import { termSummaries } from "@/shared/data/termSummaries";
import { TermList } from "@/entities/term/ui/TermList";
import { Mindmap } from "@/widgets/Mindmap/ui/Mindmap";
import { Term, TermSummary } from "@/shared/types/term";

const TermCard = dynamic(
  () => import("@/shared/ui/TermCard/TermCard").then((mod) => mod.TermCard),
  {
    loading: () => (
      <div className={styles.cardLoading}>Загрузка карточки...</div>
    )
  }
);

export const Glossary = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const termSummaryMap = useMemo(() => {
    return termSummaries.reduce<Record<string, TermSummary>>(
      (accumulator, term) => {
        accumulator[term.id] = term;
        return accumulator;
      },
      {}
    );
  }, []);

  const relatedTerms = useMemo(() => {
    if (!selectedTerm) {
      return [];
    }
    return selectedTerm.related
      .map((relatedId) => termSummaryMap[relatedId])
      .filter(Boolean);
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

    fetch(`/api/terms/${selectedId}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось загрузить термин");
        }
        return response.json();
      })
      .then((payload) => {
        setSelectedTerm(payload.data);
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
            href="https://github.com/vinichDev/glossary"
            target="_blank"
            rel="noreferrer"
          >
            Репозиторий на GitHub
          </a>
        </div>
        <Mindmap
          terms={termSummaries}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </section>

      <section className={styles.listSection}>
        <div className={styles.listGrid}>
          <TermList
            terms={termSummaries}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </section>

      {isCardOpen && (
        <div className={styles.cardOverlay} role="dialog" aria-modal="true">
          <div className={styles.cardBackdrop} onClick={() => setIsCardOpen(false)} />
          <div className={styles.cardWrapper} ref={cardRef}>
            <button
              className={styles.cardClose}
              type="button"
              onClick={() => setIsCardOpen(false)}
            >
              Закрыть
            </button>
            <TermCard
              term={
                isLoading
                  ? {
                      id: "loading",
                      title: "Загрузка...",
                      description: "Подождите, идёт загрузка описания термина.",
                      source: "",
                      sourceUrl: "#",
                      related: []
                    }
                  : selectedTerm
              }
              relatedTerms={relatedTerms}
              onRelatedSelect={(id) => setSelectedId(id)}
            />
          </div>
        </div>
      )}
    </main>
  );
};
