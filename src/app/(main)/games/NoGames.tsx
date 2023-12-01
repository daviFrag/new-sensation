import Puzzle from "@/svg/Puzzle";
import { links } from "@/utils/links";
import React from "react";

export default function NoGames() {
  return (
    <div className="flex flex-col items-center w-1/2 mt-0 mx-auto">
      <div className="h-64 mb-10">
        <Puzzle />
      </div>
      <h2 className="font-bold text-5xl mb-10">Nessun gioco creato</h2>
      <p className="text-3xl mb-10 text-center">
        Creando giochi potrai far giocare i tuoi studenti con SmartGame
      </p>
      <a href="./create">
        <button className="bg-sky-400 text-2xl text-white px-10 py-5 ease-in-out duration-75 hover:bg-sky-500 rounded-xl">
          {links.games}
        </button>
      </a>
    </div>
  );
}
