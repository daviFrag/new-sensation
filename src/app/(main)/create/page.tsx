'use client'

import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";
import { vocabularies, blocks } from "@/utils/rules";
import CreateLoaded from "./CreateLoaded";

export default function Create() {
  // TODO API

  return (
    <>
      <Header text={links.create} />
      <CreateLoaded vocabularies={vocabularies} blocks={blocks} />
    </>
  );
}
