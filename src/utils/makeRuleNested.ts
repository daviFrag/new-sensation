import { Block, Rule, RuleUnnested } from "@/types";
import { andBlockName } from "./fromApitoAppTypes";

/** CAN THROW ERROR */
export function makeRuleNested(
  sequetial_object: RuleUnnested,
  blocks: Block[]
): Rule {
  const {
    while: while_arr,
    when: when_arr,
    do: do_arr,
    scope,
  } = sequetial_object;

  if (!while_arr || !when_arr || !do_arr || scope !== "SELECTOR") {
    throw new Error("Not a selector block");
  }

  const and_block = blocks.find((b) => b.name === andBlockName);
  if (!and_block) throw new Error("No AND block found in vocabulary");

  const new_while_arr = makeArrayNested(while_arr, and_block);
  const new_when_arr = makeArrayNested(when_arr, and_block);

  if (!new_while_arr || !new_when_arr) throw new Error("empty when or while");

  const new_sequential_object: Rule = {
    id: sequetial_object.id,
    when: new_when_arr,
    while: new_while_arr,
    do: do_arr,
    scope,
  };

  return new_sequential_object;
}

function makeArrayNested(arr: Block[], and_block: Block): Block | undefined {
  if (!arr?.length) return;
  while (arr.length > 1) {
    const b_1 = arr.pop()!;
    const b_2 = arr.pop()!;
    const this_and_block: Block = JSON.parse(JSON.stringify(and_block));
    // @ts-ignore
    this_and_block.text[0].choice = b_1;
    // @ts-ignore
    this_and_block.text[2].choice = b_1;
    arr.push(this_and_block);
  }
  return arr[0];
}
