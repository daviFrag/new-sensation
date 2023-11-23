import { BlockLabel, BlockScope, BlockType } from "./ApiTypes";

export type Vocabulary = string;

export type Block = {
  name: string;
  text: BlockLabel[];
  type: BlockType;
  scope: BlockScope;
  params?: Block[];
  value?: string;
  vocabulary: Vocabulary;
};

export type Rule = {
  id?: string;
  when: Block;
  while: Block;
  do: Block[];
  scope: "SELECTOR";
};

export type RuleUnnested = {
  id?: string;
  when: Block[];
  while: Block[];
  do: Block[];
  scope: "SELECTOR";
};
