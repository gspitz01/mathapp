import { BasicOperandLimitations } from "../../../shared/models/basic-operand-limitations";
import { GcfRoundLevel } from "./gcf-round-level";

let lessThan10NoZero = new BasicOperandLimitations(true, 9, false, false);
let lessThan13NoZero = new BasicOperandLimitations(true, 12, false, false);
let lessThan20NoZero = new BasicOperandLimitations(true, 19, false, false);
let lessThan50NoZero = new BasicOperandLimitations(true, 49, false, false);
let lessThan100NoZero = new BasicOperandLimitations(true, 99, false, false);
export const EASY_GCF = new GcfRoundLevel("Easy Greatest Common Factor", 25,
  lessThan13NoZero, lessThan10NoZero);

export const MEDIUM_GCF = new GcfRoundLevel("Medium Greatest Common Factor", 20,
  lessThan20NoZero, lessThan13NoZero);

export const CHALLENGING_GCF = new GcfRoundLevel("Challenging Greatest Common Factor", 15,
  lessThan50NoZero, lessThan10NoZero);

export const HARD_GCF = new GcfRoundLevel("Hard Greatest Common Factor", 10,
  lessThan50NoZero, lessThan20NoZero);

export const EXPERT_GCF = new GcfRoundLevel("Expert Greatest Common Factor", 7,
  lessThan100NoZero, lessThan20NoZero);


export const GREATEST_COMMON_FACTOR_LEVEL_ORDER = [
  EASY_GCF,
  MEDIUM_GCF,
  CHALLENGING_GCF,
  HARD_GCF,
  EXPERT_GCF
];
