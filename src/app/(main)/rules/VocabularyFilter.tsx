import { Vocabulary } from "@/utils/BlockRuleTypes";
import React from "react";

type VocabularyChoice = "SMARTER" | "SMARTER and SmartGame";

function VocabularyFilterHardCoded(props: {
  vocabularies: Vocabulary[];
  onChange: (choice: VocabularyChoice) => void;
}) {
  const { vocabularies, onChange } = props;
  const necessary_vocabulary_1 = "SMARTER";
  const necessary_vocabulary_2 = "SmartGame";
  const choice_vocabulary_1: VocabularyChoice = "SMARTER";
  const choice_vocabulary_2: VocabularyChoice = "SMARTER and SmartGame";

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
      <label className="flex gap-5">
        <input
          type="radio"
          id={choice_vocabulary_1}
          name="choice"
          value={choice_vocabulary_1}
          className="scale-150 -z-10"
          onChange={(e) => onChange(e.target.value as VocabularyChoice)}
          defaultChecked
        />
        {choice_vocabulary_1}
      </label>

      <label className="flex gap-5">
        <input
          type="radio"
          id={choice_vocabulary_2}
          name="choice"
          value={choice_vocabulary_2}
          className="scale-150 -z-10"
          onChange={(e) => onChange(e.target.value as VocabularyChoice)}
        />
        {choice_vocabulary_2}
      </label>
    </div>
  );
}

export default function VocabularyFilter(props: {
  vocabularies: Vocabulary[];
  onChange: (choice: VocabularyChoice) => void;
}) {
  const { vocabularies, onChange } = props;

  /* return (
    <div className="w-11/12 mx-auto text-4xl py-5">
      {vocabularies.map((v) => (
        <label key={v} className="flex gap-5">
          <input type="checkbox" value={v} className="scale-150 -z-10" />
          {v}
        </label>
      ))}
    </div>
  ); */

  return <VocabularyFilterHardCoded {...props} />;
}
