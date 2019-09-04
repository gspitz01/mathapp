import { GcfRoundLevel } from './gcf-round-level';
import { BasicOperandLimitations } from './basic-operand-limitations';

const lessThan10NoZero = new BasicOperandLimitations(true, 3, 9, false);
const lessThan13NoZero = new BasicOperandLimitations(true, 3, 12, false);
const lessThan16NoZero = new BasicOperandLimitations(true, 3, 16, false);
const EASY_GCF = new GcfRoundLevel('Easy Greatest Common Factor', 25,
  lessThan10NoZero, lessThan10NoZero);

const MEDIUM_GCF = new GcfRoundLevel('Medium Greatest Common Factor', 20,
  lessThan13NoZero, lessThan10NoZero);

const CHALLENGING_GCF = new GcfRoundLevel('Challenging Greatest Common Factor', 15,
  lessThan13NoZero, lessThan13NoZero);

const HARD_GCF = new GcfRoundLevel('Hard Greatest Common Factor', 10,
  lessThan16NoZero, lessThan13NoZero);

const EXPERT_GCF = new GcfRoundLevel('Expert Greatest Common Factor', 7,
  lessThan16NoZero, lessThan16NoZero);


export const GREATEST_COMMON_FACTOR_LEVEL_ORDER = [
  EASY_GCF,
  MEDIUM_GCF,
  CHALLENGING_GCF,
  HARD_GCF,
  EXPERT_GCF
];
