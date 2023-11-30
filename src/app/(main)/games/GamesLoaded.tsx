import React, { useState } from "react";
// import VocabularyFilter from "../rules/VocabularyFilter";
import { Rule, TaskJson, Vocabulary, VocabularyMetadata } from "@/types";
import GameBox from "./GameBox";

export default function GamesLoaded(props: {
  vocabularies: Vocabulary[];
  rules: Rule[];
  tasks: TaskJson[];
  vocabularies_metadata: VocabularyMetadata[];
  reloadData: () => void;
}) {
  const { vocabularies, rules, tasks, vocabularies_metadata, reloadData } =
    props;

  const [task_keyword_searched, setTaskKeywordSearched] = useState("");
  /* const [vocabularies_choices, setVocabChoices] = useState<Vocabulary[]>([]);
  const vocabulariesChoicesChanges = (choices: Vocabulary[]) =>
    setVocabChoices(choices); */

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
      {/* <VocabularyFilter
        vocabularies={vocabularies}
        onChange={vocabulariesChoicesChanges}
      /> */}

      <div className="w-11/12 mx-auto my-5 flex justify-between">
        <input
          placeholder="Cerca..."
          className="w-1/4 rounded bg-gray-200 p-2"
          value={task_keyword_searched}
          onChange={(e) => setTaskKeywordSearched(e.target.value)}
        />
        <a href="./rules">
          <button
            className="uppercase text-white py-3 px-7 text-2xl rounded-2xl"
            style={{
              backgroundColor: "#146AB9",
            }}
          >
            Aggiungi Gioco
          </button>
        </a>
      </div>

      <div className="w-11/12 mx-auto">
        {filterTasks(tasks).map((t) => (
          <GameBox
            key={t.id}
            task={t}
            rules={rules}
            vocabularies_metadata={vocabularies_metadata}
            reloadData={reloadData}
          />
        ))}
      </div>
    </main>
  );
}
