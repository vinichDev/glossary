"use client";

import { memo } from "react";
import { GlossaryView } from "@/widgets/Glossary/ui/GlossaryView";
import { useGlossary } from "@/widgets/Glossary/model/useGlossary";
import { useGlossaryTutorial } from "@/features/glossaryTutorial/model/useGlossaryTutorial";

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

  const {
    bubbleTexts,
    handleCloseCard: handleTutorialClose,
    handleListSelect,
    handleMindmapHover,
    handleMindmapSelect,
    handleRelatedSelect,
    interactionState
  } = useGlossaryTutorial({
    onSelect: handleSelect,
    onCloseCard: handleCloseCard
  });

  return (
    <GlossaryView
      cardRef={cardRef}
      isCardOpen={isCardOpen}
      isLoading={isLoading}
      relatedTerms={relatedTerms}
      selectedId={selectedId}
      selectedTerm={selectedTerm}
      termSummaries={termSummaries}
      onCloseCard={handleTutorialClose}
      onListSelect={handleListSelect}
      onMindmapHover={handleMindmapHover}
      onMindmapSelect={handleMindmapSelect}
      onRelatedSelect={handleRelatedSelect}
      interactionState={interactionState}
      tutorialBubbleTexts={bubbleTexts}
    />
  );
});
