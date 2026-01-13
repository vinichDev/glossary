"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Glossary.module.scss";
import { termSummaries } from "@/shared/data/termSummaries";
import { TermCard } from "@/shared/ui/TermCard/TermCard";
import { TermList } from "@/entities/term/ui/TermList";
import { Mindmap } from "@/widgets/Mindmap/ui/Mindmap";
import { Term } from "@/shared/types/term";

export const Glossary = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedId) {
      setSelectedTerm(null);
      setIsCardOpen(false);
      return;
    }

    const controller = new AbortController();
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
            href="https://github.com/brendanburns/dictionary-server"
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
            />
          </div>
        </div>
      )}
    </main>
  );
};
