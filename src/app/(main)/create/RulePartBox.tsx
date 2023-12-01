import Bin from "@/svg/Bin";
import { Block, BlockScope, BlockType } from "@/types";
import React from "react";
import SelectOfStrings from "./SelectOfStrings";
import SelectOfBlocks from "./SelectOfBlocks";

function AddBlockButton(props: {
  setArray: React.Dispatch<React.SetStateAction<(Block | null)[]>>;
  type: BlockType;
  scope: BlockScope;
}) {
  const { setArray, type, scope } = props;

  return (
    <button
      className="rounded-full w-8 mx-2 aspect-square bg-sky-300 duration-100 ease-in-out hover:scale-105"
      onClick={() => setArray((prev) => [...prev, null])}
      key={`add-block-${type}-${scope}`}
    >
      +
    </button>
  );
}

/** when the element is hovered, a special effect is given, but not passed to the parents */
function WrapNodeInClickableDiv(props: {
  children: React.ReactNode;
  onClick: () => void;
}): React.ReactNode {
  const { children, onClick } = props;

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      // * on hover, add class
      onMouseOver={(e) => {
        e.stopPropagation();
        const target = e.currentTarget;
        const className = "bg-red-400 rounded py-1";
        target.className = className;
      }}
      // * when hover ends, remove class
      onMouseOut={(e) => {
        e.stopPropagation();
        const target = e.currentTarget;
        target.className = "";
      }}
    >
      {children}
    </span>
  );
}

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
              <WrapNodeInClickableDiv
                onClick={() => {
                  // * reset choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_INTEGER") throw new Error();
                  new_t.value = undefined;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }}
              >
                {t.value}
              </WrapNodeInClickableDiv>
            );
          else
            elements.push(
              <SelectOfStrings
                blocks={blocks}
                std_text="<numero>"
                options={t.label.values.map((x) => `${x}`)}
                onChange={(value) => {
                  // * select choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_INTEGER") throw new Error();
                  new_t.value = Number(value);
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }}
              />
            );

          break;
        case "PARAM_STRING":
          if (t.label.type !== "PARAM_STRING") throw new Error();

          if (t.value)
            elements.push(
              <WrapNodeInClickableDiv
                onClick={() => {
                  // * reset choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_STRING") throw new Error();
                  new_t.value = undefined;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }}
              >
                {t.value}
              </WrapNodeInClickableDiv>
            );
          else
            elements.push(
              <SelectOfStrings
                blocks={blocks}
                std_text="<stringa>"
                options={t.label.values}
                onChange={(value) => {
                  // * select choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_STRING") throw new Error();
                  new_t.value = value;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }}
              />
            );

          break;
        case "PARAM_CLASS":
          if (t.label.type !== "PARAM_CLASS") throw new Error();

          if (t.choice) {
            // * here i need to parse the block inside choice
            elements.push(
              <WrapNodeInClickableDiv
                onClick={() => {
                  // * reset choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_CLASS") throw new Error();
                  new_t.choice = undefined;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }}
              >
                {getBlockElements(t.choice, (new_choice) => {
                  // * select choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_CLASS") throw new Error();
                  new_t.choice = new_choice;
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                })}
              </WrapNodeInClickableDiv>
            );
          } else {
            const this_choice_blocks = (() => {
              // * if a logic block accepts all blocks as choice, we give all of them to the select
              if (b.type === "LOGIC" && t.label.values.includes("Block"))
                return blocks.filter((b) => b.type === "STATE");

              return t.label.values.map((x) => findBlock(x)!);
            })();

            elements.push(
              <SelectOfBlocks
                blocks={this_choice_blocks}
                std_text="<tipo>"
                onChange={(value) => {
                  // * select choice
                  const new_b: Block = JSON.parse(JSON.stringify(b));
                  const new_t = new_b.text[t_index];
                  if (new_t.type !== "PARAM_CLASS") throw new Error();
                  new_t.choice = findBlock(value);
                  new_b.text[t_index] = new_t;
                  valueIsChanged(new_b);
                }}
              />
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
    function modifyBlockOfArray(b_index: number) {
      return (new_b: Block) => {
        setArray((prev) => {
          return [
            ...prev.slice(0, b_index),
            new_b,
            ...prev.slice(b_index + 1, prev.length),
          ];
        });
      };
    }

    function resetBlock(b_index: number) {
      return () => {
        setArray((prev) => {
          return [
            ...prev.slice(0, b_index),
            null,
            ...prev.slice(b_index + 1, prev.length),
          ];
        });
      };
    }

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
        // * b is a new block, so let the user select it
        elements.push(
          <SelectOfBlocks
            blocks={getBlocksByScope(type, scope)}
            std_text="accade cosa?"
            onChange={(value) => {
              const new_block = findBlock(value);
              if (!new_block) return;
              setArray((prev) => {
                const new_arr = [...prev];
                new_arr[b_index] = new_block;
                return new_arr;
              });
            }}
          />
        );
        curr_b_index++;
        continue;
      }

      elements.push(
        <WrapNodeInClickableDiv onClick={resetBlock(b_index)}>
          {getBlockElements(b, modifyBlockOfArray(b_index))}
        </WrapNodeInClickableDiv>
      );

      curr_b_index++;
    }

    return [
      elements,
      <AddBlockButton
        key={`add-block-button-${type}-${scope}`}
        setArray={setArray}
        type={type}
        scope={scope}
      />,
    ];
  }

  return (
    <div className="w-1/3">
      <h2 className="text-2xl py-5 flex items-center gap-10">
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
