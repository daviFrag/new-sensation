"use client";

import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import GamesLoaded from "./GamesLoaded";
import {
  useRulesApiQuery,
  useTasksApiQuery,
  useVocabularyApiQuery,
} from "@/hooks/useKnownApiQuery";
import { Vocabulary, VocabularyMetadata } from "@/types";

function GamesPartial(props: {
  vocabularies_metadata: VocabularyMetadata[];
  vocabularies: Vocabulary[];
}) {
  const { vocabularies_metadata, vocabularies } = props;
  const {
    data: rules,
    is_loading: rules_is_loading,
    is_error: rules_is_error,
  } = useRulesApiQuery(vocabularies_metadata);

  const {
    data: tasks,
    is_loading: tasks_is_loading,
    is_error: tasks_is_error,
  } = useTasksApiQuery();

  if (rules_is_loading || tasks_is_loading) return <h1>Caricamento</h1>;
  if (rules_is_error || tasks_is_error) return <h1>Errore</h1>;

  return (
    <>
      <Header text={links.games} />
      <GamesLoaded vocabularies={vocabularies} rules={rules} tasks={tasks} />
    </>
  );
}

export default function Games() {
  const { data, is_loading, is_error } = useVocabularyApiQuery();

  if (is_loading) return <h1>Caricamento</h1>;
  if (is_error) return <h1>Errore</h1>;

  const { vocabularies_metadata, vocabularies } = data;

  return (
    <GamesPartial
      vocabularies_metadata={vocabularies_metadata}
      vocabularies={vocabularies}
    />
  );
}
