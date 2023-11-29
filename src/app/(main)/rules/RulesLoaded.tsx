import React, { useRef, useState } from "react";
import { Block, Rule, Vocabulary, VocabularyMetadata } from "@/types";
import { convertRuleToString } from "@/utils/convertRuleToString";
import Pen from "@/svg/Pen";
import Bin from "@/svg/Bin";
import CreateRuleMenu from "../create/CreateRuleMenu";
import VocabularyFilter from "./VocabularyFilter";
import Copy from "@/svg/Copy";
import CreateGameModal from "./CreateGameModal";
import { createRuleApi, deleteRuleApi } from "@/utils/callKnownApi";

export default function RulesLoaded(props: {
  rules: Rule[];
  vocabularies: Vocabulary[];
  blocks: Block[];
  vocabularies_metadata: VocabularyMetadata[];
  reloadRules: () => void;
}) {
  const { rules, vocabularies, blocks, vocabularies_metadata, reloadRules } =
    props;

  const modal = useRef<HTMLDialogElement>(null);

  const [rule_modify, setRuleModify] = useState("");
  const [rule_keyword_searched, setRuleKeywordSearched] = useState("");
  const [selected_rules_ids, setSelectedRulesIds] = useState<string[]>([]);
  const [vocabularies_choices, setVocabChoices] = useState<Vocabulary[]>([]);
  const vocabulariesChoicesChanges = (choices: Vocabulary[]) =>
    setVocabChoices(choices);

  function newRuleInSelectedRules(rule_id: string) {
    setSelectedRulesIds((prev_rules_ids) => {
      if (prev_rules_ids.includes(rule_id)) {
        return prev_rules_ids.filter((r) => r !== rule_id);
      } else {
        return [...prev_rules_ids, rule_id].sort();
      }
    });
  }

  function filterSearchedRules(rules: Rule[]): Rule[] {
    if (!rule_keyword_searched) return rules;
    return rules.filter((r) =>
      convertRuleToString(r)
        .toLocaleLowerCase()
        .includes(rule_keyword_searched.trim().toLocaleLowerCase())
    );
  }

  return (
    <main>
      <h1 className="w-11/12 mx-auto text-3xl font-semibold pt-10 pb-4">
        Regole
      </h1>
      <VocabularyFilter
        vocabularies={vocabularies}
        onChange={vocabulariesChoicesChanges}
      />
      <div className="w-11/12 mx-auto my-5 flex justify-between">
        <input
          placeholder="Cerca..."
          className="w-1/4 rounded bg-gray-200 p-2"
          value={rule_keyword_searched}
          onChange={(e) => setRuleKeywordSearched(e.target.value)}
        />
        <button
          className="uppercase text-white py-3 px-7 text-2xl rounded-2xl"
          style={{
            backgroundColor: !selected_rules_ids.length ? "#7E7B7B" : "#146AB9",
          }}
          disabled={!selected_rules_ids.length}
          onClick={() => {
            if (modal.current) modal.current?.showModal();
          }}
        >
          Raggruppa
        </button>
      </div>
      <div className="w-11/12 mx-auto">
        {filterSearchedRules(rules).map((r) => (
          <div
            key={r.id}
            className="text-2xl border border-black p-3 flex flex-col mb-2 rounded"
          >
            <div className=" flex justify-between">
              <input
                type="checkbox"
                className="scale-150"
                onClick={() => newRuleInSelectedRules(r.id!)}
              />
              <p className="w-10/12">{convertRuleToString(r)}</p>
              <div className="w-1/12 flex">
                <div
                  onClick={() => setRuleModify(r.id!)}
                  className="cursor-pointer duration-75 ease-in-out hover:scale-110"
                >
                  <Pen />
                </div>
                <div
                  onClick={() => {
                    createRuleApi(r, blocks, vocabularies_metadata);
                    reloadRules();
                  }}
                  className="cursor-pointer duration-75 ease-in-out hover:scale-110"
                >
                  <Copy />
                </div>
                <div
                  onClick={() => {
                    deleteRuleApi(r);
                    reloadRules();
                  }}
                  className="cursor-pointer duration-75 ease-in-out hover:scale-110"
                >
                  <Bin />
                </div>
              </div>
            </div>
            {rule_modify === r.id && (
              <CreateRuleMenu
                blocks={blocks}
                confirm_button_text="Modifica regola"
                doSomethingWithRule={(rule) => {
                  createRuleApi(rule, blocks, vocabularies_metadata);
                  reloadRules();
                }}
                extraDoOnReset={() => setRuleModify("")}
                starting_values={{
                  whileArray: [r.while],
                  whenArray: [r.while],
                  doArray: r.do,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <CreateGameModal modal={modal} rules_ids={selected_rules_ids} />
    </main>
  );
}
