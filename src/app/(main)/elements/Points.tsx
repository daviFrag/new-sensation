import React, { useState } from "react";
import { Point } from "./types";
import {
  SectionDescription,
  SectionTitle,
  Table,
  TableTitle,
  TdCell,
  ThCell,
} from "./utils";
import Pen from "@/svg/Pen";
import Bin from "@/svg/Bin";
import PlusRound from "@/svg/PlusRound";

const pointSubmit: (
  setPointModifying: (s: string) => void,
  point_to_modify?: string
) => React.FormEventHandler<HTMLFormElement> =
  (setPointModifying, point_to_modify) => (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: HTMLInputElement;
      quantity: HTMLInputElement;
    };
    const name = target.name.value;
    const quantity = target.quantity.value;

    // TODO API
    // TODO differientate between modify and new point (point_to_modify)
    alert(JSON.stringify({ name, quantity }));

    setPointModifying("");
    // @ts-expect-error
    target.reset();
  };

function PointRow({
  point,
  setPointModifying,
}: {
  point: Point;
  setPointModifying: (point_name: string) => void;
}) {
  return (
    <tr>
      <TdCell>{point.name}</TdCell>
      <TdCell>{point.quantity}</TdCell>
      <td>
        <div className="flex items-center">
          <div onClick={() => setPointModifying(point.name)} className="h-16 aspect-square hover:scale-110">
            <Pen />
          </div>
          <div
            onClick={() => {
              // TODO API
              alert(`Delete point: ${point.name}`);
            }}
            className="h-16 aspect-square hover:scale-110"
          >
            <Bin />
          </div>
        </div>
      </td>
    </tr>
  );
}

function ModifyPointRow({
  point,
  setPointModifying,
}: {
  point?: Point;
  setPointModifying: (point_name: string) => void;
}) {
  const form_id = point ? "modify-point-form" : "new-point-form";

  return (
    <tr>
      <TdCell>
        <input
          type="text"
          defaultValue={point?.name}
          placeholder="Per cosa viene assegnato? (es Esercizi livello 1...)"
          id="name"
          form={form_id}
          className="w-full bg-sky-100"
          required
        />
      </TdCell>
      <TdCell>
        <input
          type="number"
          defaultValue={point?.quantity}
          placeholder="Quanti punti vengono assegnati?"
          id="quantity"
          form={form_id}
          className="w-full bg-sky-100"
          min={0}
          required
        />
      </TdCell>
      <td>
        <form
          id={form_id}
          onSubmit={pointSubmit(setPointModifying, point?.name)}
          className="m-2 flex items-center"
        >
          <button type="submit" className="h-16 aspect-square hover:scale-110">
            <PlusRound />
          </button>
        </form>
      </td>
    </tr>
  );
}

export default function Points({ points }: { points: Point[] }) {
  const [point_modifying, setPointModifying] = useState("");

  return (
    <section>
      <SectionTitle>Punti</SectionTitle>
      <SectionDescription>
        Definisci i PUNTI da assegnare allo studente nella categoria{" "}
        {`"punti esperienza"`}
      </SectionDescription>

      <TableTitle>Punti esperienza (ghiande)</TableTitle>
      <Table>
        <colgroup>
          <col span={1} className="w-4/12" />
          <col span={1} className="w-7/12" />
          <col span={1} className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <ThCell>Nome</ThCell>
            <ThCell>Quantità</ThCell>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => {
            if (point.name === point_modifying)
              return (
                <ModifyPointRow
                  setPointModifying={setPointModifying}
                  point={point}
                />
              );

            return (
              <PointRow
                point={point}
                setPointModifying={setPointModifying}
                key={point.name}
              />
            );
          })}
          <ModifyPointRow setPointModifying={setPointModifying} />
        </tbody>
      </Table>
    </section>
  );
}
