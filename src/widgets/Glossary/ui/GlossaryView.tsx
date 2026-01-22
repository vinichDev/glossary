"use client";

import dynamic from "next/dynamic";
import styles from "./Glossary.module.scss";
import { TermList } from "@/entities/term/ui/TermList";
import { TermManagementForm } from "@/features/termManagement/ui/TermManagementForm";
import { Mindmap } from "@/widgets/Mindmap/ui/Mindmap";
import { resolveInteractionState } from "@/features/glossaryTutorial/lib/resolveInteractionState";
import type {
  GlossaryTutorialBubble,
  GlossaryTutorialInteractionState
} from "@/features/glossaryTutorial/model/types";
import type { RefObject } from "react";
import type { Term, TermSummary } from "@/shared/types/term";
import type { TermPayload } from "@/entities/term/model/types";
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
  cardRef: RefObject<HTMLDivElement>;
  isCardOpen: boolean;
  isLoading: boolean;
  isSaving: boolean;
  relatedTerms: TermSummary[];
  relatedInput: string;
  selectedId: string | null;
  selectedTerm: Term | null;
  termSummaries: TermSummary[];
  termForm: TermPayload;
  actionMessage: string | null;
  onFormChange: (next: TermPayload | ((prev: TermPayload) => TermPayload)) => void;
  onRelatedInputChange: (next: string) => void;
  onCreateTerm: () => void;
  onUpdateTerm: () => void;
  onDeleteTerm: () => void;
  onCloseCard: () => void;
  onListSelect: (id: string) => void;
  onMindmapHover: () => void;
  onMindmapSelect: (id: string) => void;
  onRelatedSelect: (id: string) => void;
  interactionState: GlossaryTutorialInteractionState;
  tutorialBubbleTexts: {
    mindmap: GlossaryTutorialBubble | null;
    list: GlossaryTutorialBubble | null;
    cardTop: GlossaryTutorialBubble | null;
    cardRelated: GlossaryTutorialBubble | null;
  };
};

export const GlossaryView = ({
  cardRef,
  isCardOpen,
  isLoading,
  isSaving,
  relatedTerms,
  relatedInput,
  selectedId,
  selectedTerm,
  termSummaries,
  termForm,
  actionMessage,
  onFormChange,
  onRelatedInputChange,
  onCreateTerm,
  onUpdateTerm,
  onDeleteTerm,
  onCloseCard,
  onListSelect,
  onMindmapHover,
  onMindmapSelect,
  onRelatedSelect,
  interactionState,
  tutorialBubbleTexts
}: GlossaryViewProps) => {
  const {
    isCloseEnabled,
    isControlsEnabled,
    isInteractionEnabled,
    isListInteractionEnabled,
    isRelatedEnabled,
    isRepoLinkEnabled,
    isSourceEnabled
  } = resolveInteractionState(interactionState);

  const renderBubble = (bubble: GlossaryTutorialBubble | null, variant: string) => {
    if (!bubble) {
      return null;
    }

    return (
      <div className={`${styles.tutorialBubble} ${variant}`}>
        <p className={styles.tutorialBubbleTitle}>Как пользоваться глоссарием</p>
        <div className={styles.tutorialBubbleStep}>
          <span className={styles.tutorialBubbleNumber}>{bubble.step}.</span>
          <span>{bubble.text}</span>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Глоссарий терминов</h1>
          <a
            className={`${styles.repoLink} ${
              isRepoLinkEnabled ? "" : styles.repoLinkDisabled
            }`}
            href={GLOSSARY_REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!isRepoLinkEnabled}
            tabIndex={isRepoLinkEnabled ? 0 : -1}
            onClick={(event) => {
              if (!isRepoLinkEnabled) {
                event.preventDefault();
              }
            }}
          >
            Репозиторий на GitHub
          </a>
        </div>
        <div className={styles.mindmapSection}>
          <Mindmap
            terms={termSummaries}
            selectedId={selectedId}
            onSelect={onMindmapSelect}
            onNodeHover={onMindmapHover}
            isInteractionLocked={!isInteractionEnabled}
            isControlsDisabled={!isControlsEnabled}
          />
          {renderBubble(tutorialBubbleTexts.mindmap, styles.tutorialBubbleMindmap)}
        </div>
      </section>

      <section className={styles.listSection}>
        {renderBubble(tutorialBubbleTexts.list, styles.tutorialBubbleList)}
        <div className={styles.listGrid}>
          <div className={styles.listTutorialWrapper}>
            <TermList
              terms={termSummaries}
              selectedId={selectedId}
              onSelect={onListSelect}
              isInteractionDisabled={!isListInteractionEnabled}
            />
          </div>
        </div>
      </section>

      <TermManagementForm
        actionMessage={actionMessage}
        isSaving={isSaving}
        onCreateTerm={onCreateTerm}
        onDeleteTerm={onDeleteTerm}
        onFormChange={onFormChange}
        onRelatedInputChange={onRelatedInputChange}
        onUpdateTerm={onUpdateTerm}
        relatedInput={relatedInput}
        selectedKeyword={selectedId}
        termForm={termForm}
      />

      {isCardOpen && (
        <div className={styles.cardOverlay} role="dialog" aria-modal="true">
          <div className={styles.cardBackdrop} onClick={onCloseCard} />
          <div className={styles.cardWrapper} ref={cardRef}>
            <button
              className={styles.cardClose}
              type="button"
              onClick={onCloseCard}
              disabled={!isCloseEnabled}
            >
              Закрыть
            </button>
            {renderBubble(tutorialBubbleTexts.cardTop, styles.tutorialBubbleCard)}
            <TermCard
              term={isLoading ? LOADING_TERM : selectedTerm}
              relatedTerms={relatedTerms}
              onRelatedSelect={onRelatedSelect}
              isRelatedDisabled={!isRelatedEnabled}
              isSourceDisabled={!isSourceEnabled}
              tutorialRelatedBubble={renderBubble(
                tutorialBubbleTexts.cardRelated,
                styles.tutorialBubbleRelated
              )}
            />
          </div>
        </div>
      )}
    </main>
  );
};
