import Ellipse from "@/svg/Ellipse";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative  overflow-hidden">
      <div className="absolute top-0 left-0 -z-40 w-full pr-32 bg-orange-400">
        <Ellipse />
      </div>
      <div className="h-screen relative flex flex-col items-center overflow-scroll">
        <header className="flex justify-between px-10 py-5 bg-transparent w-full">
          <h1 className="text-white text-4xl">SMARTER: the Rulebook</h1>
          <button
            className="bg-orange-100 p-4 text-2xl hover:bg-orange-200 hover:scale-110 ease-in-out duration-100 rounded-xl"
            style={{ color: "#0E599D" }}
          >
            TORNA SU SMARTGAME
          </button>
        </header>
        <main className="w-1/2 h-full text-3xl text-center flex flex-col justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
