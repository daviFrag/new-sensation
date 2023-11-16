export type Vocabulary = string;

export type BlockScope = "SELECTOR" | "LOGIC" | "STATE" | "DESCRIPTION" | "OUTPUT";

export type Block = {
  name: string;
  text: string;
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
