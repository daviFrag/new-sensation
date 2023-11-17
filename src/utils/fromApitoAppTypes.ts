import {
  Block,
  Rule,
  CreateRuleJson,
  Vocabulary,
  VocabularyMetadata,
  BlockJson,
} from "@/types";

function convertVocabularyMetadataToVocabularyAndBlocks(
  v: VocabularyMetadata
): {
  vocabulary: Vocabulary;
  blocks: Block[];
} {
  // TODO Vocabulary should also have the id
  const vocabulary: Vocabulary = v.name;
  const blocks: Block[] = [];

  const getBlock = (v: VocabularyMetadata, name: string): Block => {
    const b = v.blockMetadata[name];

    return {
      name,
      text: b.label,
      // TODO add scope
      scope: "DESCRIPTION",
      // TODO separare i params
      params: b.params.reduce((curr: Block[], p) => {
        return [...curr, ...p.classNameOpts.map((n) => getBlock(v, n))];
      }, []),
      // TODO where should I save the value?
      value: "",
      vocabulary,
    };
  };

  for (const name of Object.keys(v.blockMetadata)) {
    blocks.push(getBlock(v, name));
  }

  return { vocabulary, blocks };
}

function convertBlockToBlockJson(b: Block): BlockJson {
  return {
    name: b.name,
    // todo b.vocabulary.id
    vocabulary: b.vocabulary,
    params: b.params ? b.params.map((bb) => convertBlockToBlockJson(bb)) : [],
  };
}

function convertRuleToRuleJson(rule: Rule): CreateRuleJson {
  const createRuleJson: CreateRuleJson = {
    // todo add rule name
    name: "",
    condition: {
      // todo this andBlock should be taken from the vocabulary
      name: "AndBlock",
      vocabulary: "",
      params: [
        convertBlockToBlockJson(rule.when),
        convertBlockToBlockJson(rule.while),
      ],
    },
    actions: rule.do.map((b) => convertBlockToBlockJson(b)),
  };

  return createRuleJson;
}
