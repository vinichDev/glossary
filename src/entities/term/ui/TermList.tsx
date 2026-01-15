"use client";

import { memo } from "react";
import type { TermSummary } from "@/shared/types/term";
import { useTermList } from "@/entities/term/model/useTermList";
import { TermListView } from "@/entities/term/ui/TermListView";

type TermListProps = {
  terms: TermSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isInteractionDisabled?: boolean;
};

export const TermList = memo(
  ({ terms, selectedId, onSelect, isInteractionDisabled = false }: TermListProps) => {
    const { handleSelect } = useTermList({ onSelect });

    return (
      <TermListView
        terms={terms}
        selectedId={selectedId}
        onItemSelect={handleSelect}
        isInteractionDisabled={isInteractionDisabled}
      />
    );
  }
);
