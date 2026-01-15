export type GlossaryTutorialContent = "mindmap" | "list" | "card" | "close";

export type GlossaryTutorialBubble = {
  step: number;
  text: string;
};

export type GlossaryTutorialInteractionState =
  | {
      allowedContent: "all";
    }
  | {
      allowedContent: readonly GlossaryTutorialContent[];
      isCloseEnabled: boolean;
      isControlsEnabled: boolean;
      isInteractionEnabled: boolean;
      isListInteractionEnabled: boolean;
      isRelatedEnabled: boolean;
      isRepoLinkEnabled: boolean;
      isSourceEnabled: boolean;
    };

export type GlossaryTutorialResolvedState = {
  isCloseEnabled: boolean;
  isControlsEnabled: boolean;
  isInteractionEnabled: boolean;
  isListInteractionEnabled: boolean;
  isRelatedEnabled: boolean;
  isRepoLinkEnabled: boolean;
  isSourceEnabled: boolean;
};
