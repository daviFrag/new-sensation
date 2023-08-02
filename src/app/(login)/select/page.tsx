'use client'

import React from "react";
import RedirectButton from "./RedirectButton";

export default function Start() {
  // TODO API
  const username = localStorage.getItem('username');
  return (
    <>
      <h2 className="text-white">Buongiorno {username}</h2>
      <RedirectButton text="Crea regole" redirect_link="create" />
      <RedirectButton text="Le mie regole" redirect_link="rules" />
      <RedirectButton
        text="I miei elementi di gioco"
        redirect_link="elements"
      />
      <RedirectButton text="I miei giochi" redirect_link="games" />
    </>
  );
}
