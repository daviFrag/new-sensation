"use client";

import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import { rules, vocabularies } from "@/utils/rules";
import GamesLoaded from "./GamesLoaded";
import { tasks } from "@/utils/example_obj";

export default function Games() {
  return (
    <>
      <Header text={links.games} />
      <GamesLoaded vocabularies={vocabularies} rules={rules} tasks={tasks}/>
    </>
  );
}
