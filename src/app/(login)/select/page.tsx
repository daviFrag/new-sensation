"use client";

import React, { useEffect, useState } from "react";
import RedirectButton from "./RedirectButton";
import { links } from "@/utils/links";
import Logout from "@/svg/Logout";
import { useRouter } from "next/navigation";

export default function Start() {
  const router = useRouter();

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

      <button
        className="absolute bottom-0 right-0 m-10 w-20 aspect-square bg-orange-100 hover:bg-orange-200 hover:scale-110 ease-in-out duration-100 rounded-xl p-2"
        onClick={() => {
          // TODO API
          localStorage.removeItem("username");
          router.push("/");
        }}
      >
        <Logout />
      </button>
    </>
  );
}
