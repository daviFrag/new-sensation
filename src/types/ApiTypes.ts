export type CreateVocabularyMetadata = {
  name: string;
  vocabularyUrl: string;
  rootPackageName: string;
};

export type VocabularyMetadata = CreateVocabularyMetadata & {
  id: string;
  blockMetadata: { [block_name: string]: BlockMetadata };
};

export type ParamMetadata = {
  classNameOpts: string[];
};

export type BlockMetadata = {
  label: string;
  params: ParamMetadata[];
};

export type BlockJson = {
  name: string;
  vocabulary: VocabularyMetadata | string;
  params: BlockJson[];
};

export type CreateRuleJson = {
  name: string;
  condition: BlockJson;
  actions: BlockJson[];
};

export type RuleJson = CreateRuleJson & {
  id: string;
};

export type CreateTaskJson = {
  name: string;
  vocabularies: string[];
};

export type TaskJson = {
  id: string;
  name: string;
  vocabularies: VocabularyMetadata[];
  rules: RuleJson[];
};

export type TaskInfo = {
  id: string;
  instanceId: string;
  status: "IDLE" | "RUNNING" | "STOPPED";
};
