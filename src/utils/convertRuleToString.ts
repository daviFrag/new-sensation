import { Block, Rule } from "@/types";

function convertBlockToString(block: Block | undefined): string {
  if (!block) return "";

  switch (block.scope) {
    case "LOGIC":
      return `${convertBlockToString(block.params?.[0])} ${
        block.text
      } ${convertBlockToString(block.params?.[1])}`;
    case "STATE":
      return `${block.text} ${convertBlockToString(block.params?.[0])}`;
    case "DESCRIPTION":
      return block.text;
    default:
      return "";
  }
}

export function convertRuleToString(rule: Rule): string {
  let s = "QUANDO ";
  s += convertBlockToString(rule.when);
  
  s += " MENTRE ";
  s += convertBlockToString(rule.while);

  s += " ALLORA ";
  for (const b of rule.do) {
    s += `${b.text} ${b.value ?? "X"}, `;
  }

  return s.slice(0, -2);
}
