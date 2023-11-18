import React from "react";
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

  return (
    <main>
      <h1 className="w-11/12 mx-auto text-3xl font-semibold pt-12 pb-5">
        Crea una nuova regola
      </h1>
      <VocabularyFilter
        vocabularies={vocabularies}
        onChange={(choice) => console.log(choice)}
      />
      <CreateRuleMenu
        blocks={blocks}
        vocabularies={vocabularies}
        confirm_button_text="Crea regola"
        doSomethingWithRule={(rule) => {
          createRuleApi(rule, blocks, vocabularies_metadata);
        }}
      />
    </main>
  );
}
