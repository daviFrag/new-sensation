import {
  Block,
  Rule,
  CreateRuleJson,
  Vocabulary,
  VocabularyMetadata,
  BlockJson,
  RuleJson,
  BlockMetadata,
} from "@/types";

const andBlockName = "AndBlock";

function getBlockParamsFromBlockJsonParams(
  b: BlockMetadata,
  v: VocabularyMetadata
): Block["params"] {
  return b.params.reduce((curr: Block[], p) => {
    return [
      ...curr,
      ...(p.classNameOpts
        .map((n) => {
          const res = getBlock(v, n);
          if (res.status === "success") return res.block;
          console.log(res.msg);
          return null;
        })
        .filter((x) => x != null) as Block[]),
    ];
  }, []);
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
      // TODO add scope
      scope: "OUTPUT",
      params: getBlockParamsFromBlockJsonParams(b, v),
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

  return {
    status: "success",
    block: {
      name: b.name,
      vocabulary: (b.vocabulary as VocabularyMetadata).name,
      // TODO add scope
      scope: "OUTPUT",
      text: v.blockMetadata[b.name].label,
      params: getBlockParamsFromBlockJsonParams(v.blockMetadata[b.name], v),
    },
  };
}

export function convertBlockToBlockJson(b: Block): BlockJson {
  return {
    name: b.name,
    // todo b.vocabulary.id
    vocabulary: b.vocabulary,
    params: b.params ? b.params.map((bb) => convertBlockToBlockJson(bb)) : [],
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
  console.log('a')
  if (whenRes.status !== "success") return whenRes;
  const whileRes = convertBlockJsonToBlock(condition_block.params[1], v);
  console.log('b')
  if (whileRes.status !== "success") return whileRes;
  const doBlocks: Block[] = [];
  for (const b of rule_json.actions) {
    console.log('c', b.name)
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
  blocks: Block[]
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
      vocabulary: andBlock.vocabulary,
      params: [
        convertBlockToBlockJson(rule.when),
        convertBlockToBlockJson(rule.while),
      ],
    },
    actions: rule.do.map((b) => convertBlockToBlockJson(b)),
  };

  return { status: "success", rule: createRuleJson };
}
