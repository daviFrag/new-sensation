import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import RulesLoaded from "./RulesLoaded";
import { rules, vocabularies, blocks } from "@/utils/rules";

export default function Rules() {
  // TODO API

  return (
    <>
      <Header text={links.rules} />
      <RulesLoaded rules={rules} vocabularies={vocabularies} blocks={blocks} />
    </>
  );
}
