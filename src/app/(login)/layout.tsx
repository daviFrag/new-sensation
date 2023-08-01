import Ellipse from "@/svg/Ellipse";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-orange-400 h-screen relative">
      <Ellipse />
      <header className="flex justify-between px-20 py-10 bg-transparent relative">
        <h1 className="text-white text-4xl">SMARTER: the Rulebook</h1>
        <button className="bg-orange-100 p-4 text-2xl hover:bg-orange-200 hover:scale-110 ease-in-out duration-100">
          Torna su Smartgame
        </button>
      </header>
      <main className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-blue-200 h-2/4 w-2/4 rounded-xl text-2xl flex flex-col justify-center text-center">
        {children}
      </main>
    </div>
  );
}
