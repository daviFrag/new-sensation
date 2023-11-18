"use client";

import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import CreateLoaded from "./CreateLoaded";
import { useVocabularyApiQuery } from "@/hooks/useKnownApiQuery";

export default function Create() {
  const { data, is_loading, is_error } = useVocabularyApiQuery();

  if (is_loading) return <h1>Caricamento</h1>;
  if (is_error) return <h1>Errore</h1>;

  const { vocabularies, blocks } = data;

  return (
    <>
      <Header text={links.create} />
      <CreateLoaded vocabularies={vocabularies} blocks={blocks} />
    </>
  );
}
