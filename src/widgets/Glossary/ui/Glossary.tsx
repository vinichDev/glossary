"use client";

import { memo } from "react";
import { GlossaryView } from "@/widgets/Glossary/ui/GlossaryView";
import { useGlossary } from "@/widgets/Glossary/model/useGlossary";

export const Glossary = memo(() => {
  const {
    cardRef,
    handleCloseCard,
    handleSelect,
    isCardOpen,
    isLoading,
    relatedTerms,
    selectedId,
    selectedTerm,
    termSummaries
  } = useGlossary();

  return (
    <GlossaryView
      cardRef={cardRef}
      isCardOpen={isCardOpen}
      isLoading={isLoading}
      relatedTerms={relatedTerms}
      selectedId={selectedId}
      selectedTerm={selectedTerm}
      termSummaries={termSummaries}
      onCloseCard={handleCloseCard}
      onSelect={handleSelect}
    />
  );
});
