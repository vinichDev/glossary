"use client";

import { useCallback } from "react";
import type { MouseEvent } from "react";

type UseTermListParams = {
  onSelect: (id: string) => void;
};

export const useTermList = ({ onSelect }: UseTermListParams) => {
  const handleSelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.termId;
      if (id) {
        onSelect(id);
      }
    },
    [onSelect]
  );

  return { handleSelect };
};
