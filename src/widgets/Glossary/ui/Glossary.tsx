"use client";

import { memo } from "react";
import { GlossaryView } from "@/widgets/Glossary/ui/GlossaryView";
import { useGlossary } from "@/widgets/Glossary/model/useGlossary";
import { useGlossaryTutorial } from "@/features/glossaryTutorial/model/useGlossaryTutorial";
import { useTermManagement } from "@/features/termManagement/model/useTermManagement";

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
    termSummaries,
    refreshTerms,
    setSelectedKeyword
  } = useGlossary();

  const {
    actionMessage,
    createHandler,
    deleteHandler,
    formValues,
    isSaving,
    relatedInput,
    setFormValues,
    setRelatedInput,
    updateHandler
  } = useTermManagement({
    selectedKeyword: selectedId,
    selectedTerm,
    onSelectKeyword: setSelectedKeyword,
    onRefreshTerms: refreshTerms
  });

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
      isSaving={isSaving}
      relatedTerms={relatedTerms}
      relatedInput={relatedInput}
      selectedId={selectedId}
      selectedTerm={selectedTerm}
      termSummaries={termSummaries}
      termForm={formValues}
      actionMessage={actionMessage}
      onFormChange={setFormValues}
      onRelatedInputChange={setRelatedInput}
      onCreateTerm={createHandler}
      onUpdateTerm={updateHandler}
      onDeleteTerm={deleteHandler}
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
