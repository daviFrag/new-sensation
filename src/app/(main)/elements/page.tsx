import React from "react";
import Header from "../Header";
import { links } from "@/utils/links";

export default function Elements() {
  return (
    <>
      <Header text={links.elements} />
      <main>elements</main>
    </>
  );
}
