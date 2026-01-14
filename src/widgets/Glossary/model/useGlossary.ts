"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { termSummaries } from "@/shared/data/termSummaries";
import type { Term } from "@/shared/types/term";
import { fetchTermById } from "@/widgets/Glossary/lib/glossaryApi";
import { buildTermSummaryMap, getRelatedTerms } from "@/widgets/Glossary/lib/glossaryTerms";

export const useGlossary = () => {
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

  const termSummaryMap = useMemo(() => buildTermSummaryMap(termSummaries), []);

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

  return {
    cardRef,
    handleCloseCard,
    handleSelect,
    isCardOpen,
    isLoading,
    relatedTerms,
    selectedId,
    selectedTerm,
    termSummaries
  };
};
