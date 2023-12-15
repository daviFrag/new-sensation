import { Badges, Levels, Points } from "@/components/Element";
import { Badge, ExerciseLevel, ExperienceLevel, Point } from "@/components/Element/types";
import React from "react";

function ElementsLoaded(props: {
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

export default function ClientPage({}: {access_token?: string}) {
  // TODO API
  const badges: Badge[] = [
    {
      name: "my badge",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam ex non iste quae labore fugiat laudantium, nesciunt ab rem perferendis",
      image:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    },
    {
      name: "badge 2",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam ex non iste quae labore fugiat laudantium, nesciunt ab rem perferendis",
      image:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    },
  ];

  const points: Point[] = [
    {
      name: "my point",
      quantity: 5,
    },
  ];

  const exercise_levels: ExerciseLevel[] = [
    {
      n: 1,
      game: "my game",
      name: "my exercise level",
    },
  ];

  const experience_levels: ExperienceLevel[] = [
    {
      n: 1,
      name: "Livello 1 boyscout",
    },
  ];

  return (
    <ElementsLoaded
      badges={badges}
      points={points}
      exercise_levels={exercise_levels}
      experience_levels={experience_levels}
    />
  )
}
