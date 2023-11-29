import {
  Block,
  CreateTaskJson,
  Rule,
  RuleJson,
  TaskJson,
  VocabularyMetadata,
} from "@/types";
import { convertRuleToRuleJson } from "./fromApitoAppTypes";
import Swal from "sweetalert2";
import wrapApiCallInWaitingSwal from "./wrapApiCallInWaitingSwal";
import { apiDelete, apiPost } from "@/services/api";

export function createRuleApi(
  rule: Rule,
  blocks: Block[],
  vocabularies_metadata: VocabularyMetadata[],
  reloadData?: () => void
) {
  const rule_json_res = convertRuleToRuleJson(
    rule,
    blocks,
    vocabularies_metadata
  );

  if (rule_json_res.status !== "success")
    return Swal.fire("Errore", rule_json_res.msg, "error");

  const rule_json = rule_json_res.rule;
  wrapApiCallInWaitingSwal(
    () => apiPost<RuleJson>("rules", rule_json),
    (res) => {
      Swal.fire("Regola creata", res.data?.name, "success");
      if (reloadData) reloadData();
    }
  );
}

export function deleteRuleApi(rule: Rule, reloadData?: () => void) {
  if (!rule.id) return Swal.fire("Errore", "Rule does not have id", "error");

  wrapApiCallInWaitingSwal(
    () => apiDelete<RuleJson>(`rules/${rule.id}`),
    () => {
      Swal.fire("Regola eliminata", "", "success");
      if (reloadData) reloadData();
    }
  );
}

export function createTaskApi(name: string, rules_id: string[]) {
  const new_task: CreateTaskJson = {
    name,
    rules: rules_id,
  };

  wrapApiCallInWaitingSwal(
    () => apiPost<TaskJson>("tasks", new_task),
    (res) => Swal.fire("Gioco creato", res.data?.name, "success")
  );
}
