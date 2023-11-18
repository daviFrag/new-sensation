import { Block, CreateTaskJson, Rule, RuleJson, TaskJson } from "@/types";
import { convertRuleToRuleJson } from "./fromApitoAppTypes";
import Swal from "sweetalert2";
import wrapApiCallInWaitingSwal from "./wrapApiCallInWaitingSwal";
import { apiDelete, apiPost } from "@/services/api";

export function createRuleApi(rule: Rule, blocks: Block[]) {
  const rule_json_res = convertRuleToRuleJson(rule, blocks);

  if (rule_json_res.status !== "success")
    return Swal.fire("Errore", rule_json_res.msg, "error");

  const rule_json = rule_json_res.rule;
  wrapApiCallInWaitingSwal(
    () => apiPost<RuleJson>("rules", rule_json),
    (res) => Swal.fire("Regola creata", res.data.name, "success")
  );
}

export function deleteRuleApi(rule: Rule) {
  if (!rule.id) return Swal.fire("Errore", "Rule does not have id", "error");

  wrapApiCallInWaitingSwal(
    () => apiDelete<RuleJson>(`rules/${rule.id}`),
    () => Swal.fire("Regola eliminata", "", "success")
  );
}

export function createTaskApi(name: string, rules_id: string[]) {
  const new_task: CreateTaskJson = {
    name,
    rules: rules_id,
  };

  wrapApiCallInWaitingSwal(
    () => apiPost<TaskJson>("task", new_task),
    (res) => Swal.fire("Gioco creato", res.data.name, "success")
  );
}
