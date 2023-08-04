import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import { rules, vocabularies, blocks } from "./rules";
import RulesLoaded from "./RulesLoaded";

export default function Rules() {
  // TODO API

  return (
    <>
      <Header text={links.rules} />
      <RulesLoaded rules={rules} vocabularies={vocabularies} blocks={blocks}/>
    </>
  );
}
