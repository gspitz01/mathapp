import { BasicRoundLevel } from './basic-round-level';
import { ADDITION, SUBTRACTION } from './basic-operators';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { BasicOperator } from './basic-operator';

/**
 * Basis
 */
let justAddition: BasicOperator[] = [ADDITION];
let singleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 9, false, true);
export const EASY_ADDITION = new BasicRoundLevel("Easy Addition", justAddition, 25,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

let doubleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 99, false, true);
export const MEDIUM_ADDITION = new BasicRoundLevel("Medium Addition", justAddition, 20,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_ADDITION = new BasicRoundLevel("Challenging Addition", justAddition, 15,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

let tripleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 999, false, true);
export const HARD_ADDITION = new BasicRoundLevel("Hard Addition", justAddition, 8,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_ADDITION = new BasicRoundLevel("Expert Addition", justAddition, 5,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justSubtraction: BasicOperator[] = [SUBTRACTION];
export const EASY_SUBTRACTION = new BasicRoundLevel("Easy Subtraction", justSubtraction, 25,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const MEDIUM_SUBTRACTION = new BasicRoundLevel("Medium Subtraction", justSubtraction, 20,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_SUBTRACTION = new BasicRoundLevel("Challenging Subtraction", justSubtraction, 15,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const HARD_SUBTRACTION = new BasicRoundLevel("Hard Subtraction", justSubtraction, 8,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_SUBTRACTION = new BasicRoundLevel("Expert Subtraction", justSubtraction, 5,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);



export const BASIC_ADDITION_LEVEL_ORDER = [
  EASY_ADDITION,
  MEDIUM_ADDITION,
  CHALLENGING_ADDITION,
  HARD_ADDITION,
  EXPERT_ADDITION
];

export const BASIC_SUBTRACTION_LEVEL_ORDER = [
  EASY_SUBTRACTION,
  MEDIUM_SUBTRACTION,
  CHALLENGING_SUBTRACTION,
  HARD_SUBTRACTION,
  EXPERT_SUBTRACTION
];
