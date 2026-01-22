"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Term, TermSummary } from "@/shared/types/term";
import {
  fetchTermByKeyword,
  fetchTerms
} from "@/entities/term/api/termsApi";
import { buildTermSummaryMap, getRelatedTerms } from "@/widgets/Glossary/lib/glossaryTerms";

export const useGlossary = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termSummaries, setTermSummaries] = useState<TermSummary[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const handleSelect = useCallback((keyword: string) => {
    setSelectedKeyword(keyword);
  }, []);

  const handleCloseCard = useCallback(() => {
    setIsCardOpen(false);
  }, []);

  const termSummaryMap = useMemo(
    () => buildTermSummaryMap(termSummaries),
    [termSummaries]
  );

  const relatedTerms = useMemo(() => {
    return getRelatedTerms(selectedTerm, termSummaryMap);
  }, [selectedTerm, termSummaryMap]);

  const refreshTerms = useCallback(() => {
    const controller = new AbortController();

    fetchTerms(controller.signal)
      .then((terms) => setTermSummaries(terms))
      .catch(() => setTermSummaries([]));
  }, []);

  useEffect(() => {
    refreshTerms();
  }, [refreshTerms]);

  useEffect(() => {
    if (!selectedKeyword) {
      setSelectedTerm(null);
      setIsCardOpen(false);
      return;
    }

    const controller = new AbortController();
    setSelectedTerm(null);
    setIsLoading(true);
    setIsCardOpen(true);

    fetchTermByKeyword(selectedKeyword, controller.signal)
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
  }, [selectedKeyword]);

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
    refreshTerms,
    selectedId: selectedKeyword,
    selectedTerm,
    termSummaries,
    setSelectedKeyword
  };
};
