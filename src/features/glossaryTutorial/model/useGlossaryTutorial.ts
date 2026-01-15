"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GLOSSARY_TUTORIAL_ENABLED,
  GLOSSARY_TUTORIAL_STORAGE_KEY
} from "@/features/glossaryTutorial/lib/glossaryTutorialConfig";
import type {
  GlossaryTutorialBubble,
  GlossaryTutorialContent,
  GlossaryTutorialInteractionState
} from "@/features/glossaryTutorial/model/types";

type UseGlossaryTutorialParams = {
  onSelect: (id: string) => void;
  onCloseCard: () => void;
};

export const useGlossaryTutorial = ({
  onSelect,
  onCloseCard
}: UseGlossaryTutorialParams) => {
  const [tutorialStep, setTutorialStep] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isTutorialActive = tutorialStep !== null;

  const completeTutorial = useCallback(() => {
    setTutorialStep(null);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(GLOSSARY_TUTORIAL_STORAGE_KEY, "true");
    }
  }, []);

  const handleMindmapSelect = useCallback(
    (id: string) => {
      if (isTutorialActive) {
        if (tutorialStep === 1) {
          onSelect(id);
          setTutorialStep(2);
        } else if (tutorialStep === 5) {
          onSelect(id);
          completeTutorial();
        }
        return;
      }
      onSelect(id);
    },
    [completeTutorial, isTutorialActive, onSelect, tutorialStep]
  );

  const handleListSelect = useCallback(
    (id: string) => {
      if (isTutorialActive) {
        if (tutorialStep === 4) {
          onSelect(id);
          setTutorialStep(5);
        } else if (tutorialStep === 5) {
          onSelect(id);
          completeTutorial();
        }
        return;
      }
      onSelect(id);
    },
    [completeTutorial, isTutorialActive, onSelect, tutorialStep]
  );

  const handleRelatedSelect = useCallback(
    (id: string) => {
      if (isTutorialActive) {
        if (tutorialStep === 2) {
          onSelect(id);
          setTutorialStep(3);
        } else if (tutorialStep === 5) {
          onSelect(id);
          completeTutorial();
        }
        return;
      }
      onSelect(id);
    },
    [completeTutorial, isTutorialActive, onSelect, tutorialStep]
  );

  const handleMindmapHover = useCallback(() => {
    if (!isTutorialActive) {
      return;
    }
    if (isTouchDevice) {
      return;
    }
    if (tutorialStep === 0) {
      setTutorialStep(1);
    } else if (tutorialStep === 5) {
      completeTutorial();
    }
  }, [completeTutorial, isTutorialActive, isTouchDevice, tutorialStep]);

  const handleCloseCard = useCallback(() => {
    if (isTutorialActive && tutorialStep !== 3 && tutorialStep !== 5) {
      return;
    }
    onCloseCard();
    if (tutorialStep === 3) {
      setTutorialStep(4);
    } else if (tutorialStep === 5) {
      completeTutorial();
    }
  }, [completeTutorial, isTutorialActive, onCloseCard, tutorialStep]);

  useEffect(() => {
    if (!GLOSSARY_TUTORIAL_ENABLED) {
      setTutorialStep(null);
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    const isTouch =
      window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches ??
      false;
    setIsTouchDevice(isTouch);
    const isCompleted =
      window.localStorage.getItem(GLOSSARY_TUTORIAL_STORAGE_KEY) === "true";
    if (!isCompleted) {
      setTutorialStep(isTouch ? 1 : 0);
    }
  }, []);

  const getStepNumber = useCallback(
    (step: number) => {
      if (!isTouchDevice) {
        return step + 1;
      }
      return step === 0 ? 1 : step;
    },
    [isTouchDevice]
  );

  const bubbleTexts = useMemo<{
    mindmap: GlossaryTutorialBubble | null;
    list: GlossaryTutorialBubble | null;
    cardTop: GlossaryTutorialBubble | null;
    cardRelated: GlossaryTutorialBubble | null;
  }>(() => {
    return {
      mindmap:
        tutorialStep === 0 && !isTouchDevice
          ? {
              step: getStepNumber(0),
              text: "Наведите курсор на термин в mindmap, чтобы увидеть все его связи"
            }
          : tutorialStep === 1
            ? {
                step: getStepNumber(1),
                text: "Нажмите на термин в mindmap, открыть карточку с описанием термина"
              }
            : null,
      list:
        tutorialStep === 4
          ? {
              step: getStepNumber(4),
              text: isTouchDevice
                ? "Ниже расположен список терминов — нажмите на термин, чтобы открыть карточку с описанием."
                : "Нажмите на термин в списке, чтобы открыть карточку с описанием термина"
            }
          : null,
      cardTop:
        tutorialStep === 3
          ? {
              step: getStepNumber(3),
              text: "Закрой карточку термина"
            }
          : tutorialStep === 5
            ? {
                step: getStepNumber(5),
                text: "При выборе термина его связи на mindmap тоже подсвечиваются"
              }
            : null,
      cardRelated:
        tutorialStep === 2
          ? {
              step: getStepNumber(2),
              text:
                "Нажмите на связанный термин в карточке, чтобы открыть карточку с описанием связанного термина"
            }
          : null
    };
  }, [getStepNumber, isTouchDevice, tutorialStep]);

  const allowedContent = useMemo<GlossaryTutorialInteractionState["allowedContent"]>(() => {
    if (!isTutorialActive) {
      return "all" as const;
    }
    if (tutorialStep === 0 || tutorialStep === 1) {
      return ["mindmap"] as const satisfies readonly GlossaryTutorialContent[];
    }
    if (tutorialStep === 2) {
      return ["card"] as const satisfies readonly GlossaryTutorialContent[];
    }
    if (tutorialStep === 3) {
      return ["close"] as const satisfies readonly GlossaryTutorialContent[];
    }
    if (tutorialStep === 4) {
      return ["list"] as const satisfies readonly GlossaryTutorialContent[];
    }
    if (tutorialStep === 5) {
      return "all" as const;
    }
    return "all" as const;
  }, [isTutorialActive, tutorialStep]);

  const isContentEnabled = useCallback(
    (key: GlossaryTutorialContent | "repo" | "source") => {
      if (!isTutorialActive || allowedContent === "all") {
        return true;
      }
      if (key === "repo" || key === "source") {
        return false;
      }
      return allowedContent.includes(key);
    },
    [allowedContent, isTutorialActive]
  );

  const interactionState: GlossaryTutorialInteractionState =
    allowedContent === "all"
      ? { allowedContent }
      : {
          isCloseEnabled: isContentEnabled("close"),
          isControlsEnabled: isContentEnabled("mindmap"),
          isInteractionEnabled: isContentEnabled("mindmap"),
          isListInteractionEnabled: isContentEnabled("list"),
          isRelatedEnabled: isContentEnabled("card"),
          isRepoLinkEnabled: isContentEnabled("repo"),
          isSourceEnabled: isContentEnabled("source"),
          allowedContent
        };

  return {
    bubbleTexts,
    handleCloseCard,
    handleListSelect,
    handleMindmapHover,
    handleMindmapSelect,
    handleRelatedSelect,
    interactionState
  };
};
