"use client";

import React, { useState } from "react";
import Hamburger from "@/svg/Hamburger";
import SideMenu from "./SideMenu";

export default function Header({ text }: { text: string }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {showMenu && <SideMenu text={text} hideMenu={() => setShowMenu(false)} />}

      <header
        className="h-32 w-full flex items-center px-10 text-4xl text-white fixed top-0 left-0 z-10"
        style={{ backgroundColor: "#146AB9" }}
      >
        <button
          onClick={() => setShowMenu(true)}
          className="h-20 aspect-square"
        >
          <Hamburger />
        </button>
        {!showMenu && <h1 className="ml-10 uppercase">{text}</h1>}
        <h2 className="ml-auto">Smarter: the Rulebook</h2>
      </header>

      <div className="h-32 w-full" />
    </>
  );
}
