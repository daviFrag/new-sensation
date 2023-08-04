import React, { useState } from "react";
import {
  Block,
  BlockScope,
  Rule,
  RuleUnnested,
  Vocabulary,
} from "@/utils/BlockRuleTypes";
import { makeRuleNested } from "@/utils/makeRuleNested";

export default function CreateLoaded(props: {
  vocabularies: Vocabulary[];
  blocks: Block[];
}) {
  const { vocabularies, blocks } = props;

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
        className="bg-sky-400 text-white p-2"
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
        "quale circostanza sta avvenendo?",
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
          "quale circostanza sta avvenendo?",
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
    <main>
      <h1 className="w-11/12 mx-auto text-5xl font-semibold pt-12 pb-5">
        Regole
      </h1>
      <div className="w-11/12 mx-auto text-4xl py-5">
        {vocabularies.map((v) => (
          <label key={v} className="flex gap-5">
            <input type="checkbox" value={v} className="scale-150 -z-10" />
            {v}
          </label>
        ))}
      </div>
      <div className="w-11/12 mx-auto flex gap-10">
        <div className="w-4/12">
          <h2 className="text-4xl py-5">Eventi</h2>
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
      <div className="w-11/12 mx-auto flex justify-end px-10">
        <button
          onClick={() => {
            setWhenArray([]);
            setWhileArray([]);
            setDoArray([]);
          }}
          className="text-white bg-red-500 p-5 rounded text-3xl m-5"
        >
          Reset
        </button>
        <button
          onClick={() => {
            const rule_unnested: RuleUnnested = {
              when: whenArray,
              while: whileArray,
              do: doArray,
              scope: "SELECTOR",
            };

            const rule = makeRuleNested(rule_unnested);
            alert(JSON.stringify(rule, null, 2));
          }}
          className="text-white bg-sky-500 p-5 rounded text-3xl m-5"
        >
          Crea regola
        </button>
      </div>
    </main>
  );
}
