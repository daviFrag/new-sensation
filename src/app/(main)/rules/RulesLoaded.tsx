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
      <h1 className="w-11/12 mx-auto text-5xl font-semibold pt-12 pb-5">Regole</h1>
      <div className="w-11/12 mx-auto text-4xl py-5">
        {vocabularies.map((v) => (
          <label key={v} className="flex gap-5">
            <input type="checkbox" value={v} className="scale-150"/>
            {v}
          </label>
        ))}
      </div>
      <div className="w-11/12 mx-auto">
        {rules.map((r) => (
          <div key={r.id} className="text-2xl border border-black p-3">{convertRuleToString(r)}</div>
        ))}
      </div>
    </main>
  );
}
