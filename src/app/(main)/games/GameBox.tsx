import Toggle from "@/components/Toggle";
import Bin from "@/svg/Bin";
import Pen from "@/svg/Pen";
import { RuleJson, TaskJson } from "@/types";
import React, { useRef, useState } from "react";

function RuleBox(props: { rule: RuleJson }) {
  const { rule } = props;

  // TODO function to convert rule to string
  return (
    <div className="flex border-y-2 border-solid border-black text-2xl w-full px-7">
      <p className="flex items-center px-7">{rule.name}</p>
      <div className="ml-auto h-16 p-3">
        <Pen />
      </div>
      <div className="h-16 p-3">
        <Bin />
      </div>
    </div>
  );
}

export default function GameBox(props: { task: TaskJson }) {
  const { task } = props;
  const [task_running, setTaskRunning] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);

  return (
    <div className="border border-solid border-black rounded">
      <div className="flex h-12 items-center justify-start p-7 pt-12">
        <h2 className="w-4/5 mr-auto text-3xl font-bold">{task.name}</h2>
        <div className="ml-auto h-20 p-3">
          <Bin />
        </div>
      </div>

      <div className="text-2xl p-7">
        {/* TODO API */}
        <Toggle
          checked={task_running}
          label_text="attivato / disattivato"
          checkedFn={() => setTaskRunning(false)}
          uncheckedFn={() => setTaskRunning(true)}
        />
      </div>

      {task.rules.map((r) => (
        <RuleBox key={r.id} rule={r} />
      ))}

      <div className="flex justify-end p-7 w-full">
        <button
          className="uppercase text-white py-3 px-7 text-2xl rounded-2xl"
          style={{
            backgroundColor: "#146AB9",
          }}
          onClick={() => {
            if (modal.current) modal.current?.showModal();
          }}
        >
          Aggiungi Regola
        </button>
      </div>
    </div>
  );
}
