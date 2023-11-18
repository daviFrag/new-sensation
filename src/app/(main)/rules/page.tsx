"use client";

import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import RulesLoaded from "./RulesLoaded";
import { Block, Rule, Vocabulary, VocabularyMetadata } from "@/types";
import NoRules from "./NoRules";
import {
  useRulesApiQuery,
  useVocabularyApiQuery,
} from "@/hooks/useKnownApiQuery";
// import useApiQuery from "@/hooks/useApiQuery";
// import { apiGet } from "@/services/api";

function RulesPartial(props: {
  vocabularies_metadata: VocabularyMetadata[];
  vocabularies: Vocabulary[];
  blocks: Block[];
}) {
  const { vocabularies_metadata, vocabularies, blocks } = props;
  const {
    data: rules,
    is_loading,
    is_error,
  } = useRulesApiQuery(vocabularies_metadata);

  if (is_loading) return <h1>Caricamento</h1>;
  if (is_error) return <h1>Errore</h1>;

  return (
    <>
      <Header text={links.rules} />
      {rules.length > 0 ? (
        <RulesLoaded
          rules={rules}
          vocabularies={vocabularies}
          blocks={blocks}
        />
      ) : (
        <NoRules />
      )}
    </>
  );
}

export default function Rules() {
  const { data, is_loading, is_error } = useVocabularyApiQuery();

  if (is_loading) return <h1>Caricamento</h1>;
  if (is_error) return <h1>Errore</h1>;

  const { vocabularies_metadata, vocabularies, blocks } = data;

  return (
    <RulesPartial
      vocabularies_metadata={vocabularies_metadata}
      vocabularies={vocabularies}
      blocks={blocks}
    />
  );
}
