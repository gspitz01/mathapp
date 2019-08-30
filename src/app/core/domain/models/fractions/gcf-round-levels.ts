import { GcfRoundLevel } from './gcf-round-level';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';

const lessThan10NoZero = new BasicOperandLimitations(true, 3, 9, false);
const lessThan13NoZero = new BasicOperandLimitations(true, 3, 12, false);
const lessThan20NoZero = new BasicOperandLimitations(true, 3, 19, false);
const lessThan50NoZero = new BasicOperandLimitations(true, 3, 49, false);
const EASY_GCF = new GcfRoundLevel('Easy Greatest Common Factor', 25,
  lessThan13NoZero, lessThan10NoZero);

const MEDIUM_GCF = new GcfRoundLevel('Medium Greatest Common Factor', 20,
  lessThan13NoZero, lessThan13NoZero);

const CHALLENGING_GCF = new GcfRoundLevel('Challenging Greatest Common Factor', 15,
  lessThan20NoZero, lessThan10NoZero);

const HARD_GCF = new GcfRoundLevel('Hard Greatest Common Factor', 10,
  lessThan20NoZero, lessThan13NoZero);

const EXPERT_GCF = new GcfRoundLevel('Expert Greatest Common Factor', 7,
  lessThan50NoZero, lessThan10NoZero);


export const GREATEST_COMMON_FACTOR_LEVEL_ORDER = [
  EASY_GCF,
  MEDIUM_GCF,
  CHALLENGING_GCF,
  HARD_GCF,
  EXPERT_GCF
];
