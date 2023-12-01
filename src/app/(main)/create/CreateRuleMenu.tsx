import Bin from "@/svg/Bin";
import {
  Block,
  BlockScope,
  BlockType,
  Rule,
  RuleUnnested,
  VocabularyMetadata,
} from "@/types";
import { makeRuleNested } from "@/utils/makeRuleNested";
import React, { useState } from "react";
import Swal from "sweetalert2";
import RulePartBox from "./RulePartBox";

export default function CreateRuleMenu(props: {
  blocks: Block[];
  confirm_button_text: string;
  doSomethingWithRule: (rule: Rule) => void;
  extraDoOnReset?: () => void;
  vocabularies_metadata: VocabularyMetadata[];
  starting_values?: {
    id: string;
    name: string;
    whileArray: Block[];
    whenArray: Block[];
    doArray: Block[];
  };
}) {
  const {
    blocks,
    confirm_button_text,
    doSomethingWithRule,
    extraDoOnReset,
    starting_values,
    vocabularies_metadata,
  } = props;

  const [whileArray, setWhileArray] = useState<(Block | null)[]>(
    starting_values?.whileArray ?? [null]
  );
  const [whenArray, setWhenArray] = useState<(Block | null)[]>(
    starting_values?.whenArray ?? [null]
  );
  const [doArray, setDoArray] = useState<(Block | null)[]>(
    starting_values?.doArray ?? [null]
  );
  const [name, setName] = useState(starting_values?.name ?? "");

  function resetFields() {
    setWhenArray([null]);
    setWhileArray([null]);
    setDoArray([null]);
    setName("");
    if (extraDoOnReset) extraDoOnReset();
  }

  function makeRule() {
    if (!name) {
      Swal.fire("Dai un nome alla regola", "", "error");
      return;
    }

    const rule_unnested: RuleUnnested = {
      name,
      when: whenArray.filter((x) => !!x) as Block[],
      while: whileArray.filter((x) => !!x) as Block[],
      do: doArray.filter((x) => !!x) as Block[],
      scope: "SELECTOR",
    };

    try {
      const rule = makeRuleNested(
        JSON.parse(JSON.stringify(rule_unnested)),
        blocks,
        vocabularies_metadata
      );
      if (starting_values?.id) rule.id = starting_values.id;
      doSomethingWithRule(rule);
      resetFields();
    } catch (e) {
      // @ts-ignore
      const message = e.message;
      Swal.fire("Errore nel creare la regola", message, "error");
    }
  }

  return (
    <div className="w-11/12 mx-auto mt-10 flex flex-col">
      <label className="text-2xl">
        Nome della regola:
        <input
          className="border border-black px-2 mx-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <div className="flex gap-10">
        <RulePartBox
          title="Evento"
          text="QUANDO"
          blocks={blocks}
          array={whenArray}
          setArray={setWhenArray}
          type="STATE"
          scope="WHEN"
        />
        <RulePartBox
          title="Stato"
          text="MENTRE"
          blocks={blocks}
          array={whileArray}
          setArray={setWhileArray}
          type="STATE"
          scope="WHILE"
        />
        <RulePartBox
          title="Azione"
          text="ALLORA"
          blocks={blocks}
          array={doArray}
          setArray={setDoArray}
          type="ACTION"
          scope="ACTION"
        />
      </div>

      <div className="w-11/12 ml-auto flex justify-end gap-10 mt-20">
        <button
          onClick={() => resetFields()}
          className="text-white p-5 rounded-xl text-xl my-5 uppercase duration-100 ease-in-out hover:scale-105"
          style={{ backgroundColor: "#D73E3E" }}
        >
          Annulla
        </button>

        <button
          onClick={() => makeRule()}
          className="text-white bg-sky-500 p-5 rounded-xl text-2xl my-5 uppercase duration-100 ease-in-out hover:scale-105"
          style={{ backgroundColor: "#146AB9" }}
        >
          {confirm_button_text}
        </button>
      </div>
    </div>
  );
}
