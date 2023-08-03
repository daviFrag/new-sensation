import React from "react";
import { Point } from "./types";
import {
  SectionDescription,
  SectionTitle,
  Table,
  TableTitle,
  TdCell,
  ThCell,
} from "./utils";

export default function Points({ points }: { points: Point[] }) {
  const pointSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: HTMLInputElement;
      quantity: HTMLInputElement;
    };
    const name = target.name.value;
    const quantity = target.quantity.value;
    // TODO API

    console.log({ name, quantity });
  };

  return (
    <section>
      <SectionTitle>Punti</SectionTitle>
      <SectionDescription>
        Definisci i PUNTI da assegnare allo studente nella categoria{" "}
        {`"punti esperienza"`}
      </SectionDescription>
      <div>
        <TableTitle>Punti esperienza (ghiande)</TableTitle>
        <Table>
          <colgroup>
            <col span={1} className="w-1/3" />
            <col span={1} className="w-2/3" />
          </colgroup>
          <thead>
            <tr>
              <ThCell>Nome</ThCell>
              <ThCell>Quantità</ThCell>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point.name}>
                <TdCell>{point.name}</TdCell>
                <TdCell>{point.quantity}</TdCell>
              </tr>
            ))}
            <tr>
              <TdCell>
                <input
                  type="text"
                  placeholder="Per cosa viene assegnato? (es Esercizi livello 1...)"
                  id="name"
                  form="point-form"
                  className="w-full bg-sky-100"
                />
              </TdCell>
              <TdCell>
                <input
                  type="number"
                  placeholder="Quanti punti vengono assegnati?"
                  id="quantity"
                  form="point-form"
                  className="w-full bg-sky-100"
                  min={0}
                />
              </TdCell>
            </tr>
          </tbody>
        </Table>
      </div>
      <form
        id="point-form"
        onSubmit={pointSubmit}
        className="text-3xl my-4 mx-auto w-9/12"
      >
        <button
          type="submit"
          className="bg-sky-300 rounded-lg p-3 hover:bg-sky-400 duration-75 ease-in-out"
        >
          Carica nuovo badge
        </button>
      </form>
    </section>
  );
}
