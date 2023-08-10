import {
  Block,
  BlockScope,
  Rule,
  RuleUnnested,
  Vocabulary,
} from "@/utils/BlockRuleTypes";
import { makeRuleNested } from "@/utils/makeRuleNested";
import React, { useState } from "react";

export default function CreateRuleMenu(props: {
  vocabularies: Vocabulary[];
  blocks: Block[];
  confirm_button_text: string;
  doSomethingWithRule: (rule: Rule) => void;
  extraDoOnReset?: () => void;
}) {
  const {
    vocabularies,
    blocks,
    confirm_button_text,
    doSomethingWithRule,
    extraDoOnReset,
  } = props;

  const [whileArray, setWhileArray] = useState<Block[]>([]);
  const [whenArray, setWhenArray] = useState<Block[]>([]);
  const [doArray, setDoArray] = useState<Block[]>([]);

  function getBlocksByScope(scope: BlockScope): Block[] {
    return blocks.filter((b) => b.scope === scope);
  }

  function getSelectOfBlocks(
    blocks: Block[],
    std_text: string,
    setNewArray: (f: (arr: Block[]) => Block[]) => void
  ) {
    if (!blocks.length) return;

    return (
      <select
        onChange={(event) => {
          const value = event.target.value;
          const new_block = blocks.find((b) => b.name === value);
          if (!new_block) return;
          setNewArray((old_arr) => {
            return [...old_arr, { ...new_block }];
          });
        }}
        value=""
        className="text-white p-2"
        style={{ backgroundColor: "#73B9F9" }}
      >
        <option>{std_text}</option>
        {blocks.map((b) => (
          <option key={b.name} value={b.name}>
            {b.text}
          </option>
        ))}
      </select>
    );
  }

  function whenArrayToText() {
    if (!whenArray.length)
      return getSelectOfBlocks(
        getBlocksByScope("STATE"),
        "accade cosa?",
        setWhenArray
      );

    const last_block = whenArray.at(-1)!;
    let elem: React.ReactNode;
    switch (last_block.scope) {
      case "STATE":
        elem = getSelectOfBlocks(
          getBlocksByScope("DESCRIPTION"),
          "tipo",
          setWhenArray
        );
        break;
      default:
        break;
    }

    const s = whenArray.map((b) => b.text).join(" ") + " ";
    return [s, elem];
  }

  function whileArrayToText() {
    if (!whileArray.length)
      return getSelectOfBlocks(
        getBlocksByScope("STATE"),
        "quale circostanza sta occorrendo?",
        setWhileArray
      );

    const last_block = whileArray.at(-1)!;
    let elem: React.ReactNode;
    switch (last_block.scope) {
      case "STATE":
        elem = getSelectOfBlocks(
          getBlocksByScope("DESCRIPTION"),
          "tipo",
          setWhileArray
        );
        break;
      case "DESCRIPTION":
        elem = getSelectOfBlocks(getBlocksByScope("LOGIC"), "", setWhileArray);
        break;
      case "LOGIC":
        elem = getSelectOfBlocks(
          getBlocksByScope("STATE"),
          "quale circostanza sta occorrendo?",
          setWhileArray
        );
        break;
      default:
        break;
    }

    const s = whileArray.map((b) => b.text).join(" ") + " ";
    return [s, elem];
  }

  function doArrayToText() {
    let elem: React.ReactNode = getSelectOfBlocks(
      getBlocksByScope("OUTPUT").filter(
        (b) => !doArray.some((bb) => b.name === bb.name)
      ),
      "che cosa deve avvenire?",
      setDoArray
    );
    const s = doArray.map((b, i) => (
      <>
        <br />
        {b.text} ({b?.value})
        <input
          onChange={(e) => {
            const value = e.target.value;
            setDoArray((old_arr) => {
              const new_arr = [...old_arr];
              new_arr[i].value = value;
              return new_arr;
            });
          }}
          className="border border-black"
        />
      </>
    ));
    return [s, elem];
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex gap-10">
        <div className="w-4/12">
          <h2 className="text-4xl py-5">Evento</h2>
          <div className="border border-black h-96 text-3xl p-3 overflow-y-scroll">
            QUANDO {whenArrayToText()}
          </div>
        </div>
        <div className="w-4/12">
          <h2 className="text-4xl py-5">Stato</h2>
          <div className="border border-black h-96 text-3xl p-3 overflow-y-scroll">
            MENTRE {whileArrayToText()}
          </div>
        </div>
        <div className="w-4/12">
          <h2 className="text-4xl py-5">Azione</h2>
          <div className="border border-black h-96 text-3xl p-3 overflow-y-scroll">
            ALLORA {doArrayToText()}
          </div>
        </div>
      </div>
      <div className="w-11/12 ml-auto flex justify-end gap-10">
        <button
          onClick={() => {
            setWhenArray([]);
            setWhileArray([]);
            setDoArray([]);
            if (extraDoOnReset) extraDoOnReset();
          }}
          className="text-white p-5 rounded text-3xl my-5 uppercase"
          style={{ backgroundColor: "#D73E3E" }}
        >
          Annulla
        </button>
        <button
          onClick={() => {
            const rule_unnested: RuleUnnested = {
              when: whenArray,
              while: whileArray,
              do: doArray,
              scope: "SELECTOR",
            };

            try {
              const rule = makeRuleNested(
                JSON.parse(JSON.stringify(rule_unnested))
              );
              doSomethingWithRule(rule);
            } catch (e) {
              alert(e);
            }
          }}
          className="text-white bg-sky-500 p-5 rounded text-3xl my-5 uppercase"
          style={{ backgroundColor: "#146AB9" }}
        >
          {confirm_button_text}
        </button>
      </div>
    </div>
  );
}
