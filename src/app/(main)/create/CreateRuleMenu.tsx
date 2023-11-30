import {
  Block,
  BlockScope,
  BlockType,
  Rule,
  RuleUnnested,
  Vocabulary,
  VocabularyMetadata,
} from "@/types";
import { makeRuleNested } from "@/utils/makeRuleNested";
import React, { useState } from "react";

export default function CreateRuleMenu(props: {
  blocks: Block[];
  confirm_button_text: string;
  doSomethingWithRule: (rule: Rule) => void;
  extraDoOnReset?: () => void;
  vocabularies_metadata: VocabularyMetadata[];
  starting_values?: {
    id: string;
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

  function findBlock(name: string): Block | undefined {
    return blocks.find((b) => b.name === name);
  }

  function getBlocksByScope(type: BlockType, scope: BlockScope): Block[] {
    return blocks.filter((b) => b.type === type && b.scope === scope);
  }

  function getBlockString(b: Block): string {
    let s = "";
    for (const t of b.text)
      switch (t.type) {
        case "TEXT":
          if (t.label.type !== "TEXT") throw new Error();
          s += t.label.value + " ";
          break;
        case "PARAM_INTEGER":
          s += "<numero> ";
          break;
        case "PARAM_STRING":
          s += "<stringa> ";
          break;
        case "PARAM_CLASS":
          s += "<scelta> ";
          break;
      }
    return s.trim();
  }

  function getSelectOfBlocks(
    blocks: Block[],
    std_text: string,
    onChange: (value: string) => void
  ) {
    if (!blocks.length) return;

    return (
      <select
        onChange={(event) => {
          const value = event.target.value;
          onChange(value);
        }}
        value=""
        className="text-white p-2 w-full max-w-xs"
        style={{ backgroundColor: "#73B9F9" }}
      >
        <option>{std_text}</option>
        {blocks.map((b) => (
          <option key={b.name} value={b.name}>
            {getBlockString(b)}
          </option>
        ))}
      </select>
    );
  }

  function getSelectOfStrings(
    options: string[],
    std_text: string,
    onChange: (value: string) => void
  ) {
    if (!blocks.length) return;

    return (
      <select
        onChange={(event) => {
          const value = event.target.value;
          onChange(value);
        }}
        value=""
        className="text-white p-2"
        style={{ backgroundColor: "#73B9F9" }}
      >
        <option className="max-w-md">{std_text}</option>
        {options.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    );
  }

  function getBlockElements(b: Block, valueIsChanged: (new_b: Block) => void) {
    const elements: React.ReactNode[] = [];

    let curr_t_index = 0;
    for (const t of b.text) {
      const t_index = curr_t_index;
      switch (t.type) {
        case "TEXT":
          if (t.label.type !== "TEXT") throw new Error();

          elements.push(` ${t.label.value} `);

          break;
        case "PARAM_INTEGER":
          if (t.label.type !== "PARAM_INTEGER") throw new Error();

          if (t.value) elements.push(t.value);
          else
            elements.push(
              getSelectOfStrings(
                t.label.values.map((x) => `${x}`),
                "<numero>",
                (value) => {
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_INTEGER") throw new Error();
                  new_t.value = Number(value);
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }
              )
            );

          break;
        case "PARAM_STRING":
          if (t.label.type !== "PARAM_STRING") throw new Error();

          if (t.value) elements.push(t.value);
          else
            elements.push(
              getSelectOfStrings(t.label.values, "<stringa>", (value) => {
                const new_b: Block = JSON.parse(JSON.stringify(b));
                const new_t = new_b.text[t_index];
                if (new_t.type !== "PARAM_STRING") throw new Error();
                new_t.value = value;
                new_b.text[t_index] = new_t;
                valueIsChanged(new_b);
              })
            );

          break;
        case "PARAM_CLASS":
          if (t.label.type !== "PARAM_CLASS") throw new Error();

          if (t.choice) {
            // * here i need to parse the block inside choice
            elements.push(
              ...getBlockElements(t.choice, (new_choice) => {
                const new_b: Block = JSON.parse(JSON.stringify(b));
                const new_t = new_b.text[t_index];
                if (new_t.type !== "PARAM_CLASS") throw new Error();
                new_t.choice = new_choice;
                new_b.text[t_index] = new_t;
                valueIsChanged(new_b);
              })
            );
          } else {
            const this_choice_blocks = (() => {
              if (b.type === "LOGIC" && t.label.values.includes("Block"))
                return blocks.filter((b) => b.type === "STATE");
              return t.label.values.map((x) => findBlock(x)!);
            })();

            elements.push(
              getSelectOfBlocks(this_choice_blocks, "<scelta>", (value) => {
                const new_b: Block = JSON.parse(JSON.stringify(b));
                const new_t = new_b.text[t_index];
                if (new_t.type !== "PARAM_CLASS") throw new Error();
                new_t.choice = findBlock(value);
                new_b.text[t_index] = new_t;
                valueIsChanged(new_b);
              })
            );
          }

          break;
      }
      curr_t_index++;
    }

    return elements;
  }

  function blockArrayToText(
    array: (Block | null)[],
    setArray: React.Dispatch<React.SetStateAction<(Block | null)[]>>,
    type: BlockType,
    scope: BlockScope
  ): React.ReactNode[] {
    if (!array.length) {
      setArray([null]);
      return [];
    }

    const elements: React.ReactNode[] = [];

    let curr_b_index = 0;
    for (const b of array) {
      const b_index = curr_b_index;
      if (b_index) elements.push(" & ");

      if (!b) {
        // * new block
        elements.push(
          getSelectOfBlocks(
            getBlocksByScope(type, scope),
            "accade cosa?",
            (value) => {
              const new_block = findBlock(value);
              if (!new_block) return;
              setArray((prev) => {
                const new_arr = [...prev];
                new_arr[b_index] = new_block;
                return new_arr;
              });
            }
          )
        );
        curr_b_index++;
        continue;
      }

      elements.push(
        ...getBlockElements(b, (new_b) => {
          setArray((prev) => {
            return [
              ...prev.slice(0, b_index),
              new_b,
              ...prev.slice(b_index + 1, prev.length),
            ];
          });
        })
      );

      curr_b_index++;
    }

    const plus_button = (
      <button
        className="rounded-full w-8 mx-2 aspect-square bg-sky-300 duration-100 ease-in-out hover:scale-105"
        onClick={() => setArray((prev) => [...prev, null])}
        key={`add-block-${type}-${scope}`}
      >
        +
      </button>
    );

    return [elements, plus_button];
  }

  function resetFields() {
    setWhenArray([null]);
    setWhileArray([null]);
    setDoArray([null]);
    if (extraDoOnReset) extraDoOnReset();
  }

  return (
    <div className="w-11/12 mx-auto flex flex-col">
      <div className="flex gap-10">
        <div className="w-4/12">
          <h2 className="text-2xl py-5">Evento</h2>
          <div className="border border-black rounded-xl h-full text-xl p-3">
            QUANDO {blockArrayToText(whenArray, setWhenArray, "STATE", "WHEN")}
          </div>
        </div>
        <div className="w-4/12">
          <h2 className="text-2xl py-5">Stato</h2>
          <div className="border border-black rounded-xl h-full text-xl p-3">
            MENTRE{" "}
            {blockArrayToText(whileArray, setWhileArray, "STATE", "WHILE")}
          </div>
        </div>
        <div className="w-4/12">
          <h2 className="text-2xl py-5">Azione</h2>
          <div className="border border-black rounded-xl h-full text-xl p-3">
            ALLORA {blockArrayToText(doArray, setDoArray, "ACTION", "ACTION")}
          </div>
        </div>
      </div>
      <div className="w-11/12 ml-auto flex justify-end gap-10 mt-20">
        <button
          onClick={() => resetFields()}
          className="text-white p-5 rounded text-xl my-5 uppercase duration-100 ease-in-out hover:scale-105"
          style={{ backgroundColor: "#D73E3E" }}
        >
          Annulla
        </button>
        <button
          onClick={() => {
            const rule_unnested: RuleUnnested = {
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
              alert(e);
            }
          }}
          className="text-white bg-sky-500 p-5 rounded text-2xl my-5 uppercase duration-100 ease-in-out hover:scale-105"
          style={{ backgroundColor: "#146AB9" }}
        >
          {confirm_button_text}
        </button>
      </div>
    </div>
  );
}
