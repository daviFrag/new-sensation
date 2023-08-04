import { Block, Rule, RuleUnnested } from "./types";

/** CAN THROW ERROR */
export function makeRuleNested(sequetial_object: RuleUnnested): Rule {
  const {
    while: while_arr,
    when: when_arr,
    do: do_arr,
    scope,
  } = sequetial_object;

  if (!while_arr || !when_arr || !do_arr || scope !== "SELECTOR") {
    throw new Error("Not a selector block");
  }

  const new_while_arr = makeArrayNested(while_arr);
  const new_when_arr = makeArrayNested(when_arr);
  const new_do_arr = do_arr.filter((b) => b.scope === "OUTPUT");

  if (!new_while_arr || !new_when_arr) throw new Error("empty when or while");

  const new_sequential_object: Rule = {
    when: new_when_arr,
    while: new_while_arr,
    do: new_do_arr,
    scope,
  };

  return new_sequential_object;
}

function makeArrayNested(arr: Block[]): Block | undefined {
  if (!arr?.length) return;
  return nestStatesInsideLogicsRec(nestDescriptionsInsideStates(arr));
}

function nestDescriptionsInsideStates(arr: Block[]): Block[] {
  const new_arr: Block[] = [];
  while (arr.length > 0) {
    const curr = arr.shift()!;
    switch (curr.scope) {
      case "SELECTOR":
        throw new Error("SELECTOR inside SELECTOR");

      case "OUTPUT":
        throw new Error("OUTPUT block in when/while");

      case "DESCRIPTION":
        // we reached a DESCRIPTION, but it should be inside the params of the STATE that was before
        throw new Error("DESCRIPTION without STATE before it");

      case "STATE":
        while (arr[0]?.scope === "DESCRIPTION") {
          if (!curr.params) curr.params = [];
          curr.params.push(arr.shift()!);
        }
        if (!curr.params?.length) throw new Error("No DESCRIPTION after STATE");
        break;

      case "LOGIC":
        const prev_bloc = arr.at(-1);
        if (!prev_bloc) throw new Error("LOGIC without STATE before it");
        break;
    }
    new_arr.push(curr);
  }
  return new_arr;
}

function nestStatesInsideLogicsRec(arr: Block[]): Block {
  if (!arr?.length) throw new Error("empty array in nestStatesInsideLogicsRec");
  if (arr[0].scope !== "STATE") {
    throw new Error("Found alone a non STATE that shouldnt be here");
  }
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) {
    throw new Error("There are two blocks that cannot link");
  }
  if (arr[1].scope !== "LOGIC")
    throw new Error("Found a non LOGIC that shouldnt be here");
  const first_state = arr.shift()!;
  const first_logic = arr.shift()!;
  first_logic.params = [first_state, nestStatesInsideLogicsRec(arr)];
  return first_logic;
}
