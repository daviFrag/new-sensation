import Bin from "@/svg/Bin";
import { Block, BlockScope, BlockType } from "@/types";
import React from "react";

export default function RulePartBox(props: {
  title: string;
  text: string;
  blocks: Block[];
  array: (Block | null)[];
  setArray: React.Dispatch<React.SetStateAction<(Block | null)[]>>;
  type: BlockType;
  scope: BlockScope;
}) {
  const { title, text, blocks, array, setArray, type, scope } = props;

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
          s += "<tipo> ";
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
        onClick={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
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
        onClick={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
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

  function wrapNodeInClickableDiv(
    n: React.ReactNode,
    onClick: () => void
  ): React.ReactNode {
    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          const target = e.currentTarget;
          const className = "bg-red-400 rounded py-1";
          target.className = className;
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          const target = e.currentTarget;
          target.className = "";
        }}
      >
        {n}
      </span>
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

          if (t.value != null)
            elements.push(
              wrapNodeInClickableDiv(t.value, () => {
                const new_b: Block = JSON.parse(JSON.stringify(b));
                const new_t = new_b.text[t_index];
                if (new_t.type !== "PARAM_INTEGER") throw new Error();
                new_t.value = undefined;
                new_b.text[t_index] = new_t;
                valueIsChanged(new_b);
              })
            );
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

          if (t.value)
            elements.push(
              wrapNodeInClickableDiv(t.value, () => {
                const new_b: Block = JSON.parse(JSON.stringify(b));
                const new_t = new_b.text[t_index];
                if (new_t.type !== "PARAM_STRING") throw new Error();
                new_t.value = undefined;
                new_b.text[t_index] = new_t;
                valueIsChanged(new_b);
              })
            );
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
              wrapNodeInClickableDiv(
                getBlockElements(t.choice, (new_choice) => {
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_CLASS") throw new Error();
                  new_t.choice = new_choice;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }),
                () => {
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_CLASS") throw new Error();
                  new_t.choice = undefined;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }
              )
            );
          } else {
            const this_choice_blocks = (() => {
              if (b.type === "LOGIC" && t.label.values.includes("Block"))
                return blocks.filter((b) => b.type === "STATE");
              return t.label.values.map((x) => findBlock(x)!);
            })();

            elements.push(
              getSelectOfBlocks(this_choice_blocks, "<tipo>", (value) => {
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
        wrapNodeInClickableDiv(
          getBlockElements(b, (new_b) => {
            setArray((prev) => {
              return [
                ...prev.slice(0, b_index),
                new_b,
                ...prev.slice(b_index + 1, prev.length),
              ];
            });
          }),
          () => {
            setArray((prev) => {
              return [
                ...prev.slice(0, b_index),
                null,
                ...prev.slice(b_index + 1, prev.length),
              ];
            });
          }
        )
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

  return (
    <div className="w-1/3">
      <h2 className="text-2xl py-5 flex items-center gap-3">
        {title}
        <div
          onClick={() => {
            setArray([]);
          }}
          className="h-10 cursor-pointer duration-75 ease-in-out hover:scale-110"
        >
          <Bin />
        </div>
      </h2>
      <div className="border border-black rounded-xl h-full text-xl p-3">
        {text} {blockArrayToText(array, setArray, type, scope)}
      </div>
    </div>
  );
}
