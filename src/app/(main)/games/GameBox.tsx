import Toggle from "@/components/Toggle";
import useApiQuery from "@/hooks/useApiQuery";
import { apiDelete, apiGet, apiPost } from "@/services/api";
import Bin from "@/svg/Bin";
import Pen from "@/svg/Pen";
import {
  Rule,
  RuleJson,
  TaskInfo,
  TaskJson,
  VocabularyMetadata,
} from "@/types";
import { convertRuleToString } from "@/utils/convertRuleToString";
import { convertRuleJsonToRule } from "@/utils/fromApitoAppTypes";
import wrapApiCallInWaitingSwal from "@/utils/wrapApiCallInWaitingSwal";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

function RuleBox(props: {
  rule: RuleJson;
  vocabularies_metadata: VocabularyMetadata[];
}) {
  const { rule, vocabularies_metadata } = props;

  const getRuleName = () => {
    const res = convertRuleJsonToRule(rule, vocabularies_metadata);
    if (res.status !== "success")
      return `Error reading rule with id ${rule.id}`;
    return convertRuleToString(res.rule);
  };

  return (
    <div className="flex border-t-2 border-solid border-black text-2xl w-full px-7">
      <p className="flex items-center px-7">{getRuleName()}</p>
      <div
        className="ml-auto h-16 p-3"
        onClick={() => {
          /* TODO api */
        }}
      >
        <Pen />
      </div>
      <div
        className="h-16 p-3"
        onClick={() => {
          /* TODO api */
        }}
      >
        <Bin />
      </div>
    </div>
  );
}

export default function GameBox(props: {
  task: TaskJson;
  rules: Rule[];
  vocabularies_metadata: VocabularyMetadata[];
  updateData: () => void;
}) {
  const { task, rules, vocabularies_metadata, updateData } = props;
  const task_instances_url = `tasks/${task.id}/instances`;
  const modal = useRef<HTMLDialogElement>(null);
  const [instances, setInstances] = useState<TaskInfo[]>();
  const resetInstances = () =>
    apiGet<TaskInfo[]>(task_instances_url).then((res) => {
      if (res.status === "success")
        setInstances(res.data?.filter((x) => x.status !== "STOPPED"));
      console.log(res)
    });
  useEffect(() => {
    resetInstances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border border-solid border-black rounded">
      <div className="flex h-12 items-center justify-start p-7 pt-12">
        <h2 className="w-4/5 mr-auto text-3xl font-bold">{task.name}</h2>
        <div className="ml-auto h-20 p-3">
          <Bin />
        </div>
      </div>

      <div className="text-2xl p-7">
        <Toggle
          checked={!!instances && instances.length > 0}
          disabled={!instances}
          label_text="attivato / disattivato"
          checkedFn={() =>
            wrapApiCallInWaitingSwal(
              () =>
                apiDelete(task_instances_url + `/${instances?.[0].instanceId}`),
              () => {
                Swal.fire("Gioco eliminato", "", "success");
                resetInstances();
              }
            )
          }
          uncheckedFn={() =>
            wrapApiCallInWaitingSwal(
              () => apiPost(task_instances_url, {}),
              () => {
                Swal.fire("Gioco attivato", "", "success");
                resetInstances();
              }
            )
          }
        />
      </div>

      {task.rules.map((r) => (
        <RuleBox
          key={r.id}
          rule={r}
          vocabularies_metadata={vocabularies_metadata}
        />
      ))}

      <div className="flex justify-end p-7 w-full border-t-2 border-solid border-black">
        <button
          className="uppercase text-white py-3 px-7 text-2xl rounded-2xl"
          style={{
            backgroundColor: "#146AB9",
          }}
          onClick={() => {
            // TODO api add rule to task
            if (modal.current) modal.current?.showModal();
          }}
        >
          Aggiungi Regola
        </button>
      </div>
    </div>
  );
}
