"use client";

import { memo } from "react";
import type { ReactNode } from "react";
import type { Term, TermSummary } from "@/shared/types/term";
import { useTermCard } from "@/shared/ui/TermCard/model/useTermCard";
import { TermCardView } from "@/shared/ui/TermCard/TermCardView";

type TermCardProps = {
  term: Term | null;
  relatedTerms: TermSummary[];
  onRelatedSelect: (id: string) => void;
  isRelatedDisabled?: boolean;
  isSourceDisabled?: boolean;
  tutorialRelatedBubble?: ReactNode;
};

export const TermCard = memo(
  ({
    term,
    relatedTerms,
    onRelatedSelect,
    isRelatedDisabled = false,
    isSourceDisabled = false,
    tutorialRelatedBubble
  }: TermCardProps) => {
    const { handleRelatedSelect } = useTermCard({ onRelatedSelect });

    return (
      <TermCardView
        term={term}
        relatedTerms={relatedTerms}
        onRelatedSelect={handleRelatedSelect}
        isRelatedDisabled={isRelatedDisabled}
        isSourceDisabled={isSourceDisabled}
        tutorialRelatedBubble={tutorialRelatedBubble}
      />
    );
  }
);
