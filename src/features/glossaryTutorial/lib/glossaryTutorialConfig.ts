export const GLOSSARY_TUTORIAL_ENABLED = false;

export const GLOSSARY_TUTORIAL_STORAGE_KEY = "glossaryTutorialCompleted";

export const GLOSSARY_TUTORIAL_VARIANT_STORAGE_KEY =
  "glossaryTutorialVariant";

export const GLOSSARY_TUTORIAL_VARIANTS = {
  withTutorial: "withTutorial",
  withoutTutorial: "withoutTutorial"
} as const;

const metrikaCounterId = Number(process.env.NEXT_PUBLIC_METRIKA_ID);

export const GLOSSARY_TUTORIAL_METRIKA_COUNTER_ID =
  Number.isFinite(metrikaCounterId) && metrikaCounterId > 0
    ? metrikaCounterId
    : null;

export const GLOSSARY_TUTORIAL_METRIKA_GOALS = {
  withTutorial: "glossary_card_open_with_tutorial",
  withoutTutorial: "glossary_card_open_without_tutorial"
} as const;
