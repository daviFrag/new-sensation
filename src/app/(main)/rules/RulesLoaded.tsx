import React, { useState } from "react";
import { Block, Rule, Vocabulary } from "@/utils/BlockRuleTypes";
import { convertRuleToString } from "@/utils/convertRuleToString";
import Pen from "@/svg/Pen";
import Bin from "@/svg/Bin";
import CreateRuleMenu from "../create/CreateRuleMenu";
import VocabularyFilter from "./VocabularyFilter";

export default function RulesLoaded(props: {
  rules: Rule[];
  vocabularies: Vocabulary[];
  blocks: Block[];
}) {
  const { rules, vocabularies, blocks } = props;
  const [rule_modify, setRuleModify] = useState("");

  return (
    <main>
      <h1 className="w-11/12 mx-auto text-5xl font-semibold pt-12 pb-5">
        Regole
      </h1>
      <VocabularyFilter
        vocabularies={vocabularies}
        onChange={(choice) => console.log(choice)}
      />
      <div className="w-11/12 mx-auto">
        {rules.map((r) => (
          <div
            key={r.id}
            className="text-2xl border border-black p-3 flex flex-col"
          >
            <div className=" flex justify-between">
              <p className="w-10/12">{convertRuleToString(r)}</p>
              <div className="w-1/12 flex">
                <div onClick={() => setRuleModify(r.id!)}>
                  <Pen />
                </div>
                <div
                  onClick={() => {
                    // TODO API
                    alert(`Delete rule with id: ${r.id}`);
                  }}
                >
                  <Bin />
                </div>
              </div>
            </div>
            {rule_modify === r.id && (
              <CreateRuleMenu
                blocks={blocks}
                vocabularies={vocabularies}
                confirm_button_text="Modifica regola"
                doSomethingWithRule={(rule) => {
                  // TODO API
                  alert(
                    `Modify rule with id ${r.id}: ${JSON.stringify(
                      rule,
                      null,
                      2
                    )}`
                  );
                }}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
