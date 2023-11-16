export type ParamMetadata = {
  classNameOpts: string[];
};

export type BlockMetadata = {
  label: string;
  params: ParamMetadata[];
};

export type VocabularyMetadata = {
  id: string;
  name: string;
  vocabularyUrl: string;
  rootPackageName: string;
  blockMetadata: { [block_name: string]: BlockMetadata };
};

export type BlockJson = {
  name: string;
  vocabulary: VocabularyMetadata;
  params: BlockJson[];
};

export type RuleJson = {
  id: string;
  name: string;
  condition: BlockJson;
  actions: BlockJson[];
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
