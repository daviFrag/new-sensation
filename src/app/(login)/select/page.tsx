"use client";

import React, { useEffect, useState } from "react";
import RedirectButton from "./RedirectButton";
import { links } from "@/utils/links";

export default function Start() {
  // TODO API
  // const username = localStorage.getItem("username");
  // ? use client not working, problems with localstorage and pre rendering
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("username") ?? "");
  }, []);

  return (
    <>
      <h2 className="text-white">Buongiorno {username}</h2>
      {Object.keys(links).map((link) => (
        <RedirectButton
          text={links[link as keyof typeof links]}
          redirect_link={link}
          key={link}
        />
      ))}
    </>
  );
}
