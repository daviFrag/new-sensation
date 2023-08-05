import React from "react";
import { Block, Vocabulary } from "@/utils/BlockRuleTypes";
import CreateRuleMenu from "./CreateRuleMenu";

export default function CreateLoaded(props: {
  vocabularies: Vocabulary[];
  blocks: Block[];
}) {
  const { vocabularies, blocks } = props;

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
      <CreateRuleMenu blocks={blocks} vocabularies={vocabularies} />
    </main>
  );
}
