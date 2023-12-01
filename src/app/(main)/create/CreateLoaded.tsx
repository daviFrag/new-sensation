import React, { useMemo, useState } from "react";
import { Block, Vocabulary, VocabularyMetadata } from "@/types";
import CreateRuleMenu from "./CreateRuleMenu";
import VocabularyFilter from "../rules/VocabularyFilter";
import { createRuleApi } from "@/utils/callKnownApi";

export default function CreateLoaded(props: {
  vocabularies: Vocabulary[];
  blocks: Block[];
  vocabularies_metadata: VocabularyMetadata[];
}) {
  const { vocabularies, blocks, vocabularies_metadata } = props;
  const [vocabularies_choices, setVocabChoices] = useState<Vocabulary[]>([]);
  const vocabulariesChoicesChanges = (choices: Vocabulary[]) =>
    setVocabChoices(choices);
  const filtered_blocks = useMemo(
    () => blocks.filter((b) => vocabularies_choices.includes(b.vocabulary)),
    [blocks, vocabularies_choices]
  );

  return (
    <main>
      <h1 className="w-11/12 mx-auto text-3xl font-semibold pt-12 pb-5">
        Crea una nuova regola
      </h1>
      <VocabularyFilter
        vocabularies={vocabularies}
        onChange={vocabulariesChoicesChanges}
      />
      {(!filtered_blocks?.length && <div>no rules</div>) || (
        <CreateRuleMenu
          blocks={filtered_blocks}
          confirm_button_text="Crea regola"
          vocabularies_metadata={vocabularies_metadata}
          doSomethingWithRule={(rule) => {
            createRuleApi(rule, blocks, vocabularies_metadata);
          }}
        />
      )}
    </main>
  );
}
