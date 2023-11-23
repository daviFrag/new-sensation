import {
  Block,
  Rule,
  CreateRuleJson,
  Vocabulary,
  VocabularyMetadata,
  BlockJson,
  RuleJson,
  BlockMetadata,
  BlockScope,
} from "@/types";

const andBlockName = "AndBlock";

function getBlockParamsFromBlockMetadataParams(
  b: BlockMetadata,
  v: VocabularyMetadata
): Block["params"] {
  const new_params: Block["params"] = [];

  for (const param of b.params) {
    if (!param?.classNameOpts?.length) {
      continue;
    }
    for (const block_name of param.classNameOpts) {
      const res = getBlock(v, block_name);
      if (res.status !== "success") console.error(res.msg);
      else new_params.push(res.block);
    }
  }

  return new_params;
}

export function getBlock(
  v: VocabularyMetadata,
  name: string
): { status: "success"; block: Block } | { status: "error"; msg: string } {
  const b = v.blockMetadata[name];

  if (!b) {
    const msg = `Block ${name} does not exist in vocabulary`;
    console.error(msg);
    return { status: "error", msg };
  }

  return {
    status: "success",
    block: {
      name,
      text: b.label,
      scope: b.scope,
      type: b.type,
      params: getBlockParamsFromBlockMetadataParams(b, v),
      // TODO where should I save the value?
      value: "",
      vocabulary: v.name,
    },
  };
}

export function convertVocabularyMetadataToVocabularyAndBlocks(
  v: VocabularyMetadata
): {
  vocabulary: Vocabulary;
  blocks: Block[];
} {
  // TODO Vocabulary should also have the id?
  const vocabulary: Vocabulary = v.name;
  const blocks: Block[] = [];

  for (const name of Object.keys(v.blockMetadata)) {
    const x = getBlock(v, name);
    if (x.status === "success") blocks.push(x.block);
    else console.log(x.msg);
  }

  return { vocabulary, blocks };
}

export function convertBlockJsonToBlock(
  b: BlockJson,
  vv: VocabularyMetadata[]
): { status: "success"; block: Block } | { status: "error"; msg: string } {
  const v = vv.find(
    (x) =>
      x.id === b.vocabulary || x.id === (b.vocabulary as VocabularyMetadata).id
  );

  if (!v) {
    const msg = `Block ${b.name} Vocabulary does not exist`;
    console.error(msg);
    return { status: "error", msg };
  }

  const params: Block["params"] = [];
  for (const child_block of b.params) {
    const res = convertBlockJsonToBlock(child_block, vv);
    if (res.status !== "success") console.error(res.msg);
    else params.push(res.block);
  }

  const block: Block = {
    name: b.name,
    vocabulary: (b.vocabulary as VocabularyMetadata).name,
    type: v.blockMetadata[b.name].type,
    scope: v.blockMetadata[b.name].scope,
    text: v.blockMetadata[b.name].label,
    params,
  };

  return {
    status: "success",
    block,
  };
}

export function convertBlockToBlockJson(
  b: Block,
  vocabularies_metadata: VocabularyMetadata[]
): BlockJson {
  return {
    name: b.name,
    vocabulary: findIdOfVocabulary(b.vocabulary, vocabularies_metadata),
    params: b.params
      ? b.params.map((bb) => convertBlockToBlockJson(bb, vocabularies_metadata))
      : [],
    value: b.value,
  };
}

export function convertRuleJsonToRule(
  rule_json: RuleJson,
  v: VocabularyMetadata[]
): { status: "success"; rule: Rule } | { status: "error"; msg: string } {
  const condition_block = rule_json.condition;

  if (condition_block.name != andBlockName) {
    const msg = `Rule Condition is not starting with ${andBlockName} (starting with ${condition_block.name})`;
    console.error(msg);
    return { status: "error", msg };
  }

  const whenRes = convertBlockJsonToBlock(condition_block.params[0], v);
  if (whenRes.status !== "success") return whenRes;
  const whileRes = convertBlockJsonToBlock(condition_block.params[1], v);
  if (whileRes.status !== "success") return whileRes;
  const doBlocks: Block[] = [];
  for (const b of rule_json.actions) {
    const res = convertBlockJsonToBlock(b, v);
    if (res.status !== "success") return res;
    doBlocks.push(res.block);
  }

  return {
    status: "success",
    rule: {
      id: rule_json.id,
      when: whenRes.block,
      while: whileRes.block,
      do: doBlocks,
      scope: "SELECTOR",
    },
  };
}

export function convertRuleToRuleJson(
  rule: Rule,
  blocks: Block[],
  vocabularies_metadata: VocabularyMetadata[]
):
  | { status: "success"; rule: CreateRuleJson }
  | { status: "error"; msg: string } {
  const andBlock = blocks.find((b) => b.name == andBlockName);
  if (!andBlock) {
    const msg = `${andBlockName} not present`;
    console.error(msg);
    return { status: "error", msg };
  }

  const createRuleJson: CreateRuleJson = {
    // todo add rule name
    name: "",
    condition: {
      name: andBlockName,
      vocabulary: findIdOfVocabulary(
        andBlock.vocabulary,
        vocabularies_metadata
      ),
      params: [
        convertBlockToBlockJson(rule.when, vocabularies_metadata),
        convertBlockToBlockJson(rule.while, vocabularies_metadata),
      ],
      value: "",
    },
    actions: rule.do.map((b) =>
      convertBlockToBlockJson(b, vocabularies_metadata)
    ),
  };

  return { status: "success", rule: createRuleJson };
}

function findIdOfVocabulary(
  name: string,
  vocabularies_metadata: VocabularyMetadata[]
): VocabularyMetadata["id"] {
  return vocabularies_metadata.find((v) => v.name === name)?.id ?? "";
}
