"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Glossary.module.scss";
import { terms } from "@/shared/data/terms";
import { TermCard } from "@/shared/ui/TermCard/TermCard";
import { TermList } from "@/entities/term/ui/TermList";
import { Mindmap } from "@/widgets/Mindmap/ui/Mindmap";

export const Glossary = () => {
  const [selectedId, setSelectedId] = useState<string | null>(terms[0]?.id ?? null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const selectedTerm = useMemo(
    () => terms.find((term) => term.id === selectedId) ?? null,
    [selectedId]
  );

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedId]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Глоссарий терминов</h1>
          <p className={styles.description}>
            Mindmap показывает связи терминов, а список ниже помогает быстро
            перейти к карточке определения.
          </p>
        </div>
        <Mindmap terms={terms} selectedId={selectedId} onSelect={setSelectedId} />
      </section>

      <section className={styles.listSection}>
        <div className={styles.listGrid}>
          <TermList terms={terms} selectedId={selectedId} onSelect={setSelectedId} />
          <div ref={cardRef}>
            <TermCard term={selectedTerm} />
          </div>
        </div>
      </section>
    </main>
  );
};
