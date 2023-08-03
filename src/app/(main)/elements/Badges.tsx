import React from "react";
import {
  SectionDescription,
  SectionTitle,
  Table,
  TableTitle,
  TdCell,
  ThCell,
} from "./utils";
import { Badge } from "./types";
import Image from "next/image";
import { toBase64 } from "@/utils/toBase64";

export default function Badges({ badges }: { badges: Badge[] }) {
  const badgeSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: HTMLInputElement;
      description: HTMLInputElement;
      image: HTMLInputElement;
    };
    const name = target.name.value;
    const description = target.description.value;
    const image = target.image.files?.[0];
    // TODO API
    if (image) {
      toBase64(image).then((image_b64) =>
        console.log({ name, description, image_b64 })
      );
    } else {
      console.log({ name, description });
    }
  };

  return (
    <section>
      <SectionTitle>Riconoscimenti</SectionTitle>
      <SectionDescription>
        Definisci i RICONOSCIMENTI presenti nella categoria {`"badge"`}
      </SectionDescription>
      <div>
        <TableTitle>Badge</TableTitle>
        <Table>
          <colgroup>
            <col span={1} className="w-1/4" />
            <col span={1} className="w-2/4" />
            <col span={1} className="w-1/4" />
          </colgroup>
          <thead>
            <tr>
              <ThCell>Nome</ThCell>
              <ThCell>Descrizione</ThCell>
              <ThCell>Immagine</ThCell>
            </tr>
          </thead>
          <tbody>
            {badges.map((badge) => (
              <tr key={badge.name}>
                <TdCell>{badge.name}</TdCell>
                <TdCell>{badge.description}</TdCell>
                <TdCell>
                  <div className="w-10 h-10 relative mx-auto">
                    <Image src={badge.image} alt={badge.name} layout="fill" />
                  </div>
                </TdCell>
              </tr>
            ))}
            <tr>
              <TdCell>
                <input
                  type="text"
                  placeholder="Inserisci il nome del badge"
                  id="name"
                  form="badge-form"
                  className="w-full bg-sky-100"
                />
              </TdCell>
              <TdCell>
                <input
                  type="text"
                  placeholder="Inserisci una descrizione (es. Raccogli 8 ghiande...)"
                  id="description"
                  form="badge-form"
                  className="w-full bg-sky-100"
                />
              </TdCell>
              <TdCell>
                <label>
                  Carica immagine
                  <input
                    type="file"
                    // accept="image/png, image/gif, image/jpeg"
                    accept="image/jpeg"
                    placeholder="Carica immagine"
                    id="image"
                    form="badge-form"
                    className="w-full bg-sky-100"
                  />
                </label>
              </TdCell>
            </tr>
          </tbody>
        </Table>
      </div>
      <form
        id="badge-form"
        onSubmit={badgeSubmit}
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
