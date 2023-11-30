import Bin from '@/svg/Bin';
import Pen from '@/svg/Pen';
import { RuleJson, VocabularyMetadata } from '@/types';
import { convertRuleToString } from '@/utils/convertRuleToString';
import { convertRuleJsonToRule } from '@/utils/fromApitoAppTypes';
import React from 'react'

export default function RuleBox(props: {
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
        className="ml-auto h-16 p-3 cursor-pointer duration-75 ease-in-out hover:scale-110"
        onClick={() => {
          /* TODO api */
        }}
      >
        <Pen />
      </div>
      <div
        className="h-16 p-3 cursor-pointer duration-75 ease-in-out hover:scale-110"
        onClick={() => {
          /* TODO api */
        }}
      >
        <Bin />
      </div>
    </div>
  );
}