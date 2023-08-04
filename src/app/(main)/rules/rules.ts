import { makeRuleNested } from "./makeRuleNested";
import { Block, Rule, RuleUnnested, Vocabulary } from "./types";

export const vocabularies = {
  smarter: "Smarter",
  smartgame: "SmartGame",
} as const;

export const blocks = {
  AND: {
    name: "AND",
    scope: "LOGIC",
    text: "e",
    vocabulary: vocabularies.smarter,
  },
  CARD_INSERTED: {
    name: "CARD_INSERTED",
    scope: "STATE",
    text: "inserisci",
    vocabulary: vocabularies.smarter,
  },
  ON_LEFT: {
    name: "ON_LEFT",
    scope: "STATE",
    text: "a sinistra",
    vocabulary: vocabularies.smarter,
  },
  ON_RIGHT: {
    name: "ON_RIGHT",
    scope: "STATE",
    text: "a destra",
    vocabulary: vocabularies.smarter,
  },
  SYMBOL_CARD: {
    name: "SYMBOL_CARD",
    scope: "DESCRIPTION",
    text: "simbolo",
    vocabulary: vocabularies.smarter,
  },
  NUMBER_CARD: {
    name: "NUMBER_CARD",
    scope: "DESCRIPTION",
    text: "numero",
    vocabulary: vocabularies.smarter,
  },
  LED_COLOR: {
    name: "LED_COLOR",
    scope: "OUTPUT",
    text: "colore LED",
    vocabulary: vocabularies.smarter,
  },
  POINTS: {
    name: "POINTS",
    scope: "OUTPUT",
    text: "inserisci",
    vocabulary: vocabularies.smartgame,
  },
} as const;

export const rules_unnested: RuleUnnested[] = [
  {
    when: [blocks.CARD_INSERTED, blocks.SYMBOL_CARD],
    while: [
      blocks.ON_LEFT,
      blocks.NUMBER_CARD,
      blocks.AND,
      blocks.ON_RIGHT,
      blocks.NUMBER_CARD,
    ],
    do: [{ ...blocks.POINTS, value: "5" }],
    scope: "SELECTOR",
  },
  {
    when: [blocks.CARD_INSERTED, blocks.NUMBER_CARD],
    while: [
      blocks.ON_LEFT,
      blocks.NUMBER_CARD,
      blocks.AND,
      blocks.ON_LEFT,
      blocks.SYMBOL_CARD,
      blocks.AND,
      blocks.ON_RIGHT,
      blocks.SYMBOL_CARD,
    ],
    do: [{ ...blocks.LED_COLOR, value: "#ff0000" }],
    scope: "SELECTOR",
  },
];

export const rules = (
  JSON.parse(JSON.stringify(rules_unnested)) as RuleUnnested[]
).map((r) => makeRuleNested(r));
