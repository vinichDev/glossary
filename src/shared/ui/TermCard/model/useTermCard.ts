"use client";

import { useCallback } from "react";
import type { MouseEvent } from "react";

type UseTermCardParams = {
  onRelatedSelect: (id: string) => void;
};

export const useTermCard = ({ onRelatedSelect }: UseTermCardParams) => {
  const handleRelatedSelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.termId;
      if (id) {
        onRelatedSelect(id);
      }
    },
    [onRelatedSelect]
  );

  return { handleRelatedSelect };
};
