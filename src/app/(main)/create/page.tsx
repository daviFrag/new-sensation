import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";

export default function Create() {
  return (
    <>
      <Header text={links.create} />
      <main>create</main>
    </>
  );
}
