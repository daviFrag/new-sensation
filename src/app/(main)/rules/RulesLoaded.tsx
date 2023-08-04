import React from "react";
import { Block, Rule, Vocabulary } from "./types";
import { convertRuleToString } from "./convertRuleToString";

export default function RulesLoaded(props: {
  rules: Rule[];
  vocabularies: Vocabulary[];
  blocks: Block[];
}) {
  const { rules, vocabularies, blocks } = props;

  return (
    <main>
      <div>
        {vocabularies.map((v) => (
          <label key={v}>
            {v}
            <input type="checkbox" value={v} />
          </label>
        ))}
      </div>
      <div>
        {rules.map((r) => (
          <div key={r.id}>{convertRuleToString(r)}</div>
        ))}
      </div>
    </main>
  );
}
