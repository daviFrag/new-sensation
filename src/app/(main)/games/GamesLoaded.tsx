import React, { useRef, useState } from "react";
import VocabularyFilter from "../rules/VocabularyFilter";
import { Rule, TaskJson, Vocabulary } from "@/types";
import GameBox from "./GameBox";

export default function GamesLoaded(props: {
  vocabularies: Vocabulary[];
  rules: Rule[];
  tasks: TaskJson[];
}) {
  const { vocabularies, rules, tasks } = props;

  const modal = useRef<HTMLDialogElement>(null);

  const [task_keyword_searched, setTaskKeywordSearched] = useState("");

  function filterTasks(tasks: TaskJson[]): TaskJson[] {
    if (!task_keyword_searched) return tasks;
    return tasks.filter((t) =>
      t.name
        .toLocaleLowerCase()
        .includes(task_keyword_searched.trim().toLocaleLowerCase())
    );
  }

  return (
    <main>
      <h1 className="w-11/12 mx-auto text-3xl font-semibold pt-10 pb-4">
        Giochi
      </h1>
      <VocabularyFilter
        vocabularies={vocabularies}
        onChange={(choice) => console.log(choice)}
      />

      <div className="w-11/12 mx-auto my-5 flex justify-between">
        <input
          placeholder="Cerca..."
          className="w-1/4 rounded bg-gray-200 p-2"
          value={task_keyword_searched}
          onChange={(e) => setTaskKeywordSearched(e.target.value)}
        />
        <button
          className="uppercase text-white py-3 px-7 text-2xl rounded-2xl"
          style={{
            backgroundColor: "#146AB9",
          }}
          onClick={() => {
            if (modal.current) modal.current?.showModal();
          }}
        >
          Aggiungi Gioco
        </button>
      </div>

      <div className="w-11/12 mx-auto">
        {filterTasks(tasks).map((t) => (
          <GameBox key={t.id} task={t} />
        ))}
      </div>
    </main>
  );
}
