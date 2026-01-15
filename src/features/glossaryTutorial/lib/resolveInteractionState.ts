import type {
  GlossaryTutorialInteractionState,
  GlossaryTutorialResolvedState
} from "@/features/glossaryTutorial/model/types";

export const resolveInteractionState = (
  interactionState: GlossaryTutorialInteractionState
): GlossaryTutorialResolvedState => {
  if (interactionState.allowedContent === "all") {
    return {
      isCloseEnabled: true,
      isControlsEnabled: true,
      isInteractionEnabled: true,
      isListInteractionEnabled: true,
      isRelatedEnabled: true,
      isRepoLinkEnabled: true,
      isSourceEnabled: true
    };
  }

  return {
    isCloseEnabled: interactionState.isCloseEnabled,
    isControlsEnabled: interactionState.isControlsEnabled,
    isInteractionEnabled: interactionState.isInteractionEnabled,
    isListInteractionEnabled: interactionState.isListInteractionEnabled,
    isRelatedEnabled: interactionState.isRelatedEnabled,
    isRepoLinkEnabled: interactionState.isRepoLinkEnabled,
    isSourceEnabled: interactionState.isSourceEnabled
  };
};
