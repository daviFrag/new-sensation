import React from "react";
import { Badge, ExerciseLevel, ExperienceLevel, Point } from "./types";
import Badges from "./Badges";
import Points from "./Points";
import Levels from "./Levels";

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
      <Levels exercise_levels={exercise_levels} experience_levels={experience_levels} />
    </main>
  );
}
