"use client";

import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import RulesLoaded from "./RulesLoaded";
import { rules as myrules, vocabularies, blocks } from "@/utils/rules";
import { Rule } from "@/utils/BlockRuleTypes";
import NoRules from "./NoRules";
// import useApiQuery from "@/hooks/useApiQuery";
// import { apiGet } from "@/services/api";

export default function Rules() {
  // const {
  //   data,
  //   is_loading,
  //   is_error,
  //   invalidateQuery,
  // } = useApiQuery("", apiGet<any>);

  // if (is_loading) return <h1>Caricamento...</h1>;
  // if (is_error) return <h1>Errore nel caricamento dati</h1>;

  // console.log(data);

  // TODO API
  const rules: Rule[] = myrules;

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
