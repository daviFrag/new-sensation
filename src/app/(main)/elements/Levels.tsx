import React from "react";
import { ExerciseLevel, ExperienceLevel } from "./types";
import {
  SectionDescription,
  SectionTitle,
  Table,
  TableTitle,
  TdCell,
  ThCell,
} from "./utils";

export default function Levels({
  exercise_levels,
  experience_levels,
}: {
  exercise_levels: ExerciseLevel[];
  experience_levels: ExperienceLevel[];
}) {
  const exerciseSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      n: HTMLInputElement;
      game: HTMLInputElement;
      name: HTMLInputElement;
    };
    const n = target.n.value;
    const game = target.game.value;
    const name = target.name.value;
    // TODO API
    console.log({ n, game, name });
  };

  const experienceSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      n: HTMLInputElement;
      name: HTMLInputElement;
    };
    const n = target.n.value;
    const name = target.name.value;
    // TODO API
    console.log({ n, name });
  };

  return (
    <section>
      <SectionTitle>Livelli</SectionTitle>
      <SectionDescription>
        Definisci i LIVELLI presenti nelle categorie {`"livelli esercizio"`} e{" "}
        {`"livelli esperienza"`}
      </SectionDescription>

      <TableTitle>Livelli esercizio</TableTitle>
      <Table>
        <colgroup>
          <col span={1} className="w-1/4" />
          <col span={1} className="w-1/4" />
          <col span={1} className="w-2/4" />
        </colgroup>
        <thead>
          <tr>
            <ThCell>N livello</ThCell>
            <ThCell>Gioco</ThCell>
            <ThCell>Nome</ThCell>
          </tr>
        </thead>
        <tbody>
          {exercise_levels.map((level) => (
            <tr key={level.name}>
              <TdCell>{level.n}</TdCell>
              <TdCell>{level.game}</TdCell>
              <TdCell>{level.name}</TdCell>
            </tr>
          ))}
          <tr>
            <TdCell>
              <input
                type="number"
                placeholder="1,2,3,..."
                id="n"
                form="exercise-form"
                className="w-full bg-sky-100"
                min={0}
              />
            </TdCell>
            <TdCell>
              <input
                type="text"
                placeholder="Per quale gioco?"
                id="game"
                form="exercise-form"
                className="w-full bg-sky-100"
              />
            </TdCell>
            <TdCell>
              <input
                type="text"
                placeholder="Come si chiama il livello? (es. Livello 1, Livello base, ...)"
                id="name"
                form="exercise-form"
                className="w-full bg-sky-100"
              />
            </TdCell>
          </tr>
        </tbody>
      </Table>

      <form
        id="exercise-form"
        onSubmit={exerciseSubmit}
        className="text-3xl my-4 mx-auto w-9/12"
      >
        <button
          type="submit"
          className="bg-sky-300 rounded-lg p-3 hover:bg-sky-400 duration-75 ease-in-out"
        >
          Carica nuovo livello esercizio
        </button>
      </form>

      <TableTitle>Livelli esperienza</TableTitle>
      <Table>
        <colgroup>
          <col span={1} className="w-1/4" />
          <col span={1} className="w-3/4" />
        </colgroup>
        <thead>
          <tr>
            <ThCell>N livello</ThCell>
            <ThCell>Nome</ThCell>
          </tr>
        </thead>
        <tbody>
          {experience_levels.map((level) => (
            <tr key={level.name}>
              <TdCell>{level.n}</TdCell>
              <TdCell>{level.name}</TdCell>
            </tr>
          ))}
          <tr>
            <TdCell>
              <input
                type="number"
                placeholder="1,2,3,..."
                id="n"
                form="experience-form"
                className="w-full bg-sky-100"
                min={0}
              />
            </TdCell>
            <TdCell>
              <input
                type="text"
                placeholder="Come si chiama il livello? (es. Boyscout, Primi passi, Principianti, ...)"
                id="name"
                form="experience-form"
                className="w-full bg-sky-100"
              />
            </TdCell>
          </tr>
        </tbody>
      </Table>

      <form
        id="experience-form"
        onSubmit={experienceSubmit}
        className="text-3xl my-4 mx-auto w-9/12"
      >
        <button
          type="submit"
          className="bg-sky-300 rounded-lg p-3 hover:bg-sky-400 duration-75 ease-in-out"
        >
          Carica nuovo livello esperienza
        </button>
      </form>
    </section>
  );
}
