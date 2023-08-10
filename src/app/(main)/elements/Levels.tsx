import React, { useState } from "react";
import { ExerciseLevel, ExperienceLevel } from "./types";
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

const exerciseSubmit: (
  setExerciseLevelModifying: (s: string) => void,
  level_to_modify?: string
) => React.FormEventHandler<HTMLFormElement> =
  (setExerciseLevelModifying, level_to_modify) => (event) => {
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
    // TODO differientate between modify and new level (level_to_modify)
    alert(JSON.stringify({ n, game, name }));

    setExerciseLevelModifying("");
    // @ts-expect-error
    target.reset();
  };

const experienceSubmit: (
  setExperienceLevelModifying: (s: string) => void,
  level_to_modify?: string
) => React.FormEventHandler<HTMLFormElement> =
  (setExperienceLevelModifying, level_to_modify) => (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      n: HTMLInputElement;
      name: HTMLInputElement;
    };
    const n = target.n.value;
    const name = target.name.value;

    // TODO API
    // TODO differientate between modify and new level (level_to_modify)
    alert(JSON.stringify({ n, name }));

    setExperienceLevelModifying("");
    // @ts-expect-error
    target.reset();
  };

function ExerciseLevelRow({
  level,
  setExerciseLevelModifying,
}: {
  level: ExerciseLevel;
  setExerciseLevelModifying: (level_name: string) => void;
}) {
  return (
    <tr>
      <TdCell>{level.n}</TdCell>
      <TdCell>{level.game}</TdCell>
      <TdCell>{level.name}</TdCell>
      <td>
        <div className="flex items-center">
          <div
            onClick={() => setExerciseLevelModifying(level.name)}
            className="h-16 aspect-square hover:scale-110"
          >
            <Pen />
          </div>
          <div
            onClick={() => {
              // TODO API
              alert(`Delete level: ${level.name}`);
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

function ExperienceLevelRow({
  level,
  setExperienceLevelModifying,
}: {
  level: ExperienceLevel;
  setExperienceLevelModifying: (level_name: string) => void;
}) {
  return (
    <tr>
      <TdCell>{level.n}</TdCell>
      <TdCell>{level.name}</TdCell>
      <td>
        <div className="flex items-center">
          <div
            onClick={() => setExperienceLevelModifying(level.name)}
            className="h-16 aspect-square hover:scale-110"
          >
            <Pen />
          </div>
          <div
            onClick={() => {
              // TODO API
              alert(`Delete level: ${level.name}`);
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

function ModifyExerciseLevelRow({
  level,
  setExerciseLevelModifying,
}: {
  level?: ExerciseLevel;
  setExerciseLevelModifying: (level_name: string) => void;
}) {
  const form_id = level ? "modify-exercise-form" : "new-exercise-form";

  return (
    <tr>
      <TdCell>
        <input
          type="number"
          defaultValue={level?.n}
          placeholder="1,2,3,..."
          id="n"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          min={0}
          required
        />
      </TdCell>
      <TdCell>
        <input
          type="text"
          defaultValue={level?.game}
          placeholder="Per quale gioco?"
          id="game"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          required
        />
      </TdCell>
      <TdCell>
        <input
          type="text"
          defaultValue={level?.name}
          placeholder="Come si chiama il livello? (es. Livello 1, Livello base, ...)"
          id="name"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          required
        />
      </TdCell>
      <td>
        <form
          id={form_id}
          onSubmit={exerciseSubmit(setExerciseLevelModifying)}
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

function ModifyExperienceLevelRow({
  level,
  setExperienceLevelModifying,
}: {
  level?: ExperienceLevel;
  setExperienceLevelModifying: (level_name: string) => void;
}) {
  const form_id = level ? "modify-experience-form" : "new-experience-form";

  return (
    <tr>
      <TdCell>
        <input
          type="number"
          defaultValue={level?.n}
          placeholder="1,2,3,..."
          id="n"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          min={0}
          required
        />
      </TdCell>
      <TdCell>
        <input
          type="text"
          defaultValue={level?.name}
          placeholder="Come si chiama il livello? (es. Boyscout, Primi passi, Principianti, ...)"
          id="name"
          form={form_id}
          className="w-full"
          style={{ backgroundColor: "#E6F0F9" }}
          required
        />
      </TdCell>
      <td>
        <form
          id={form_id}
          onSubmit={experienceSubmit(setExperienceLevelModifying)}
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

export default function Levels({
  exercise_levels,
  experience_levels,
}: {
  exercise_levels: ExerciseLevel[];
  experience_levels: ExperienceLevel[];
}) {
  const [exercise_level_modifying, setExerciseLevelModifying] = useState("");
  const [experience_level_modifying, setExperienceLevelModifying] =
    useState("");

  return (
    <section>
      <SectionTitle>Livelli</SectionTitle>
      <SectionDescription>
        Definisci i LIVELLI presenti nelle categorie {`"livelli esercizio"`} e{" "}
        {`"livelli esperienza"`}.
      </SectionDescription>

      <TableTitle>Livelli esercizio</TableTitle>
      <Table>
        <colgroup>
          <col span={1} className="w-3/12" />
          <col span={1} className="w-3/12" />
          <col span={1} className="w-5/12" />
          <col span={1} className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <ThCell>N livello</ThCell>
            <ThCell>Gioco</ThCell>
            <ThCell>Nome</ThCell>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exercise_levels.map((level) => {
            if (exercise_level_modifying === level.name)
              return (
                <ModifyExerciseLevelRow
                  setExerciseLevelModifying={setExerciseLevelModifying}
                  level={level}
                />
              );

            return (
              <ExerciseLevelRow
                key={level.name}
                level={level}
                setExerciseLevelModifying={setExerciseLevelModifying}
              />
            );
          })}
          <ModifyExerciseLevelRow
            setExerciseLevelModifying={setExerciseLevelModifying}
          />
        </tbody>
      </Table>

      <TableTitle>Livelli esperienza</TableTitle>
      <Table>
        <colgroup>
          <col span={1} className="w-3/12" />
          <col span={1} className="w-8/12" />
          <col span={1} className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <ThCell>N livello</ThCell>
            <ThCell>Nome</ThCell>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience_levels.map((level) => {
            if (experience_level_modifying === level.name)
              return (
                <ModifyExperienceLevelRow
                  setExperienceLevelModifying={setExperienceLevelModifying}
                  level={level}
                />
              );

            return (
              <ExperienceLevelRow
                key={level.name}
                level={level}
                setExperienceLevelModifying={setExperienceLevelModifying}
              />
            );
          })}
          <ModifyExperienceLevelRow
            setExperienceLevelModifying={setExperienceLevelModifying}
          />
        </tbody>
      </Table>
    </section>
  );
}
