import { createTaskApi } from "@/utils/callKnownApi";
import React from "react";

function InputField(props: {
  id: string;
  label: string;
  extra_text?: string;
  required?: boolean;
}) {
  const { id, label, extra_text, required } = props;

  return (
    <>
      <label htmlFor={id} className="text-2xl">
        {label}
      </label>
      {extra_text && <p>{extra_text}</p>}
      <input
        id={id}
        className="w-1/2 h-10 rounded-lg p-3"
        style={{ backgroundColor: "#E4E1E1" }}
        required={required}
      />
    </>
  );
}

// ! Watch out for compatibility in really old web browser versions: https://caniuse.com/dialog
export function CreateGameModal(props: {
  rules_ids: string[];
  modal: React.RefObject<HTMLDialogElement>;
  access_token?: string;
}) {
  const { rules_ids, modal, access_token } = props;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // @ts-ignore
    const name = e.target.name.value as string;
    // @ts-ignore
    const classrooms = e.target.classrooms.value as string;
    // @ts-ignore
    const students = e.target.students.value as string;
    // TODO check if the fields name are correct
    const form_result = { name, classrooms, students };

    createTaskApi(name, rules_ids, access_token);

    modal.current?.close();
  }

  return (
    <dialog
      ref={modal}
      className="w-3/5 h-3/5 bg-white border border-black rounded-2xl py-7 px-20"
    >
      <form
        method="dialog"
        onSubmit={onSubmit}
        className="flex flex-col justify-evenly h-full"
      >
        <h3 className="text-3xl font-bold">Nuovo gioco</h3>

        <InputField id="name" label="Nome del gioco" required />
        <InputField
          id="classrooms"
          label="Classi"
          extra_text="Seleziona a quali classi si applica il gioco. Potrai modificare questa
          informazione anche nella pagina “I miei giochi”."
        />
        <InputField
          id="students"
          label="Studenti"
          extra_text="Se vuoi che il gioco venga mostrato solo per alcuni studenti,
          seleziona a quali studenti si applica. Potrai modificare questa
          informazione anche nella pagina “I miei giochi”."
        />

        <div className="w-11/12 ml-auto flex justify-end gap-10">
          <button
            type="button"
            onClick={() => {
              if (modal.current) modal.current.close();
            }}
            className="text-white rounded text-xl uppercase w-32 p-2"
            style={{ backgroundColor: "#D73E3E" }}
          >
            Annulla
          </button>
          <button
            type="submit"
            className="text-white rounded text-2xl uppercase w-32 p-2"
            style={{ backgroundColor: "#146AB9" }}
          >
            Crea
          </button>
        </div>
      </form>
    </dialog>
  );
}
