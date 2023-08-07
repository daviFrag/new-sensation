import { Vocabulary } from "@/utils/BlockRuleTypes";
import React from "react";

type VocabularyChoice = "Smarter" | "Smarter and Smartgame";
const necessary_vocabulary_1 = "Smarter";
const necessary_vocabulary_2 = "SmartGame";

export default function VocabularyFilter(props: {
  vocabularies: Vocabulary[];
  onChange: (choice: VocabularyChoice) => void;
}) {
  const { vocabularies } = props;

  if (
    !vocabularies.includes(necessary_vocabulary_1) ||
    !vocabularies.includes(necessary_vocabulary_2)
  )
    return (
      <div className="w-11/12 mx-auto text-4xl py-5">
        NOT THE NECESSARY VOCABULARIES FOR SMARTER
      </div>
    );

  return (
    <div className="w-11/12 mx-auto text-4xl py-5">
      {vocabularies.map((v) => (
        <label key={v} className="flex gap-5">
          <input type="checkbox" value={v} className="scale-150  -z-10" />
          {v}
        </label>
      ))}
    </div>
  );
}
