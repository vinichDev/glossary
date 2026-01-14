"use client";

import { memo } from "react";
import type { Term, TermSummary } from "@/shared/types/term";
import { useTermCard } from "@/shared/ui/TermCard/model/useTermCard";
import { TermCardView } from "@/shared/ui/TermCard/TermCardView";

type TermCardProps = {
  term: Term | null;
  relatedTerms: TermSummary[];
  onRelatedSelect: (id: string) => void;
};

export const TermCard = memo(
  ({ term, relatedTerms, onRelatedSelect }: TermCardProps) => {
    const { handleRelatedSelect } = useTermCard({ onRelatedSelect });

    return (
      <TermCardView
        term={term}
        relatedTerms={relatedTerms}
        onRelatedSelect={handleRelatedSelect}
      />
    );
  }
);
