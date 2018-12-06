import { BasicOperator } from "./basic-operator";
import { GCF } from "./basic-operators";
import { BasicOperandLimitations } from "./basic-operand-limitations";
import { GcfRoundLevel } from "./gcf-round-level";

let justGcf: BasicOperator[] = [GCF];
let lessThan20NoZero = new BasicOperandLimitations(true, 19, true, false);
let lessThan50NoZero = new BasicOperandLimitations(true, 49, true, false);
let lessThan100NoZero = new BasicOperandLimitations(true, 99, true, false);
export const EASY_GCF = new GcfRoundLevel("Easy Greatest Common Factor", 25,
  lessThan20NoZero, lessThan20NoZero, null, 50);

export const MEDIUM_GCF = new GcfRoundLevel("Medium Greatest Common Factor", 20,
  lessThan20NoZero, lessThan50NoZero, null, 40);

export const CHALLENGING_GCF = new GcfRoundLevel("Challenging Greatest Common Factor", 15,
  lessThan50NoZero, lessThan50NoZero, null, 30);

export const HARD_GCF = new GcfRoundLevel("Hard Greatest Common Factor", 10,
  lessThan50NoZero, lessThan100NoZero, null, 20);

export const EXPERT_GCF = new GcfRoundLevel("Expert Greatest Common Factor", 7,
  lessThan100NoZero, lessThan100NoZero, null, 10);


export const GREATEST_COMMON_FACTOR_LEVEL_ORDER = [
  EASY_GCF,
  MEDIUM_GCF,
  CHALLENGING_GCF,
  HARD_GCF,
  EXPERT_GCF
];
