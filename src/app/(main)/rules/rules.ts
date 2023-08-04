import { makeRuleNested } from "./makeRuleNested";
import { RuleUnnested } from "./types";

export const vocabularies_obj = {
  smarter: "Smarter",
  smartgame: "SmartGame",
} as const;

export const blocks_obj = {
  AND: {
    name: "AND",
    scope: "LOGIC",
    text: "E",
    vocabulary: vocabularies_obj.smarter,
  },
  CARD_INSERTED: {
    name: "CARD_INSERTED",
    scope: "STATE",
    text: "viene inserita una tessera",
    vocabulary: vocabularies_obj.smarter,
  },
  CARD_REMOVED: {
    name: "CARD_REMOVED",
    scope: "STATE",
    text: "viene rimossa una tessera",
    vocabulary: vocabularies_obj.smarter,
  },
  ON_LEFT: {
    name: "ON_LEFT",
    scope: "STATE",
    text: "a sinistra e' presente una tessera",
    vocabulary: vocabularies_obj.smarter,
  },
  ON_RIGHT: {
    name: "ON_RIGHT",
    scope: "STATE",
    text: "a destra e' presente una tessera",
    vocabulary: vocabularies_obj.smarter,
  },
  SYMBOL_CARD: {
    name: "SYMBOL_CARD",
    scope: "DESCRIPTION",
    text: "simbolo",
    vocabulary: vocabularies_obj.smarter,
  },
  NUMBER_CARD: {
    name: "NUMBER_CARD",
    scope: "DESCRIPTION",
    text: "numero",
    vocabulary: vocabularies_obj.smarter,
  },
  LED_COLOR: {
    name: "LED_COLOR",
    scope: "OUTPUT",
    text: "accendi LED di colore",
    vocabulary: vocabularies_obj.smarter,
  },
  POINTS: {
    name: "POINTS",
    scope: "OUTPUT",
    text: "dai punti",
    vocabulary: vocabularies_obj.smartgame,
  },
} as const;

export const rules_unnested: RuleUnnested[] = [
  {
    id: "1",
    when: [blocks_obj.CARD_INSERTED, blocks_obj.SYMBOL_CARD],
    while: [
      blocks_obj.ON_LEFT,
      blocks_obj.NUMBER_CARD,
      blocks_obj.AND,
      blocks_obj.ON_RIGHT,
      blocks_obj.NUMBER_CARD,
    ],
    do: [{ ...blocks_obj.POINTS, value: "5" }],
    scope: "SELECTOR",
  },
  {
    id: "2",
    when: [blocks_obj.CARD_INSERTED, blocks_obj.NUMBER_CARD],
    while: [
      blocks_obj.ON_LEFT,
      blocks_obj.NUMBER_CARD,
      blocks_obj.AND,
      blocks_obj.ON_LEFT,
      blocks_obj.SYMBOL_CARD,
      blocks_obj.AND,
      blocks_obj.ON_RIGHT,
      blocks_obj.SYMBOL_CARD,
    ],
    do: [{ ...blocks_obj.LED_COLOR, value: "#ff0000" }],
    scope: "SELECTOR",
  },
  {
    id: "3",
    when: [blocks_obj.CARD_REMOVED, blocks_obj.NUMBER_CARD],
    while: [blocks_obj.ON_LEFT, blocks_obj.NUMBER_CARD],
    do: [
      { ...blocks_obj.LED_COLOR, value: "#eeeeee" },
      { ...blocks_obj.POINTS, value: "2" },
    ],
    scope: "SELECTOR",
  },
];

export const rules = (
  JSON.parse(JSON.stringify(rules_unnested)) as RuleUnnested[]
).map((r) => makeRuleNested(r));

export const vocabularies = Object.keys(vocabularies_obj).map(
  (key) => vocabularies_obj[key as keyof typeof vocabularies_obj]
);

export const blocks = Object.keys(blocks_obj).map(
  (key) => blocks_obj[key as keyof typeof blocks_obj]
);
