import React, { useState } from "react";
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
import Pen from "@/svg/Pen";
import Bin from "@/svg/Bin";
import PlusRound from "@/svg/PlusRound";

const badgeSubmit: (
  setBadgeModifying: (s: string) => void,
  badge_to_modify?: string
) => React.FormEventHandler<HTMLFormElement> =
  (setBadgeModifying, badge_to_modify) => (event) => {
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
    // TODO differientate between modify and new badge (badge_to_modify)
    if (image) {
      toBase64(image).then((image_b64) =>
        alert(JSON.stringify({ name, description, image_b64 }))
      );
    } else {
      alert(JSON.stringify({ name, description }));
    }

    setBadgeModifying("");
    // @ts-expect-error
    target.reset();
  };

function BadgeRow({
  badge,
  setBadgeModifying,
}: {
  badge: Badge;
  setBadgeModifying: (badge_name: string) => void;
}) {
  return (
    <tr>
      <TdCell>{badge.name}</TdCell>
      <TdCell>{badge.description}</TdCell>
      <TdCell>
        <div className="w-10 h-10 relative mx-auto">
          <Image src={badge.image} alt={badge.name} layout="fill" />
        </div>
      </TdCell>
      <td>
        <div className="flex items-center">
          <div onClick={() => setBadgeModifying(badge.name)} className="h-16 aspect-square hover:scale-110">
            <Pen />
          </div>
          <div
            onClick={() => {
              // TODO API
              alert(`Delete badge: ${badge.name}`);
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

function ModifyBadgeRow({
  badge,
  setBadgeModifying,
}: {
  badge?: Badge;
  setBadgeModifying: (badge_name: string) => void;
}) {
  const form_id = badge ? "modify-badge-form" : "new-badge-form";

  return (
    <tr>
      <TdCell>
        <input
          type="text"
          defaultValue={badge?.name}
          placeholder="Inserisci il nome del badge."
          id="name"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          required
        />
      </TdCell>
      <TdCell>
        <textarea
          defaultValue={badge?.description}
          placeholder="Inserisci una descrizione (es. Raccogli 8 ghiande...)"
          id="description"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          required
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
            form={form_id}
            className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          />
        </label>
      </TdCell>
      <td>
        <form
          id={form_id}
          onSubmit={badgeSubmit(setBadgeModifying, badge?.name)}
          className="m-2 flex items-center"
        >
          <button
            type="submit"
            className="h-16 aspect-square hover:scale-110"
          >
            <PlusRound />
          </button>
        </form>
      </td>
    </tr>
  );
}

export default function Badges({ badges }: { badges: Badge[] }) {
  const [badge_modifying, setBadgeModifying] = useState("");

  return (
    <section>
      <SectionTitle>Riconoscimenti</SectionTitle>
      <SectionDescription>
        Definisci i RICONOSCIMENTI presenti nella categoria {`"badge"`}.
      </SectionDescription>

      <TableTitle>Badge</TableTitle>
      <Table>
        <colgroup>
          <col span={1} className="w-3/12" />
          <col span={1} className="w-4/12" />
          <col span={1} className="w-3/12" />
          <col span={1} className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <ThCell>Nome</ThCell>
            <ThCell>Descrizione</ThCell>
            <ThCell>Immagine</ThCell>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge) => {
            if (badge.name === badge_modifying)
              return (
                <ModifyBadgeRow
                  badge={badge}
                  setBadgeModifying={setBadgeModifying}
                />
              );

            return (
              <BadgeRow
                badge={badge}
                setBadgeModifying={setBadgeModifying}
                key={badge.name}
              />
            );
          })}
          <ModifyBadgeRow setBadgeModifying={setBadgeModifying} />
        </tbody>
      </Table>
    </section>
  );
}
