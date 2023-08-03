import React from "react";
import { Badge, ExerciseLevel, ExperienceLevel, Point } from "./types";
import Badges from "./Badges";
import { SectionDescription, SectionTitle } from "./utils";
import Points from "./Points";

export default function ElementsLoaded(props: {
  badges: Badge[];
  points: Point[];
  exercise_levels: ExerciseLevel[];
  experience_levels: ExperienceLevel[];
}) {
  const { badges, points, exercise_levels, experience_levels } = props;

  return (
    <main className="px-10">
      <Badges badges={badges} />
      <Points points={points} />
      <section>
        <SectionTitle>Livelli</SectionTitle>
        <SectionDescription>
          Definisci i LIVELLI presenti nelle categorie {`"livelli esercizio"`} e{" "}
          {`"livelli esperienza"`}
        </SectionDescription>
      </section>
    </main>
  );
}
