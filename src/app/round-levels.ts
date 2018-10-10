import { BasicRoundLevel } from './basic-round-level';
import { ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION } from './basic-operators';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { BasicOperator } from './basic-operator';
import { BasicResultLimitations } from './basic-result-limitations';
import { FractionRoundLevel } from './fraction-round-level';
import { FractionOperator } from './fraction-operator';
import { FRACTION_ADDITION } from './fraction-operators';
import { FractionOperandLimitations } from './fraction-operand-limitations';
import { FractionResultLimitations } from './fraction-result-limitations';

/**
 * Basis
 */
let justAddition: BasicOperator[] = [ADDITION];
let singleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 1, false, true);
export const EASY_ADDITION = new BasicRoundLevel("Easy Addition", justAddition,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

let doubleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 2, false, true);
export const MEDIUM_ADDITION = new BasicRoundLevel("Medium Addition", justAddition,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_ADDITION = new BasicRoundLevel("Challenging Addition", justAddition,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

let tripleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 3, false, true);
export const HARD_ADDITION = new BasicRoundLevel("Hard Addition", justAddition,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_ADDITION = new BasicRoundLevel("Expert Addition", justAddition,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justSubtraction: BasicOperator[] = [SUBTRACTION];
export const EASY_SUBTRACTION = new BasicRoundLevel("Easy Subtraction", justSubtraction,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const MEDIUM_SUBTRACTION = new BasicRoundLevel("Medium Subtraction", justSubtraction,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_SUBTRACTION = new BasicRoundLevel("Challenging Subtraction", justSubtraction,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const HARD_SUBTRACTION = new BasicRoundLevel("Hard Subtraction", justSubtraction,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_SUBTRACTION = new BasicRoundLevel("Expert Subtraction", justSubtraction,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justMultiplication: BasicOperator[] = [MULTIPLICATION];
export const EASY_MULTIPLICATION = new BasicRoundLevel("Easy Multiplication", justMultiplication,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const MEDIUM_MULTIPLICATION = new BasicRoundLevel("Medium Multiplication", justMultiplication,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_MULTIPLICATION = new BasicRoundLevel("Challenging Multiplication", justMultiplication,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const HARD_MULTIPLICATION = new BasicRoundLevel("Hard Multiplication", justMultiplication,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_MULTIPLICATION = new BasicRoundLevel("Expert Multiplication", justMultiplication,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justDivision: BasicOperator[] = [DIVISION];
let divisorSingleDigitLimitations = new BasicOperandLimitations(true, 1, false, false);
let divisorDoubleDigitLimitations = new BasicOperandLimitations(true, 2, false, false);
let divisorTripleDigitLimitations = new BasicOperandLimitations(true, 3, false, false);
let onlyPositiveWholeNumberResult = new BasicResultLimitations(true, false);
export const EASY_DIVISION = new BasicRoundLevel("Easy Division", justDivision,
    singleDigitPositiveWholeNumbers, divisorSingleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const MEDIUM_DIVISION = new BasicRoundLevel("Medium Division", justDivision,
    doubleDigitPositiveWholeNumbers, divisorSingleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const CHALLENGING_DIVISION = new BasicRoundLevel("Challenging Division", justDivision,
    doubleDigitPositiveWholeNumbers, divisorDoubleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const HARD_DIVISION = new BasicRoundLevel("Hard Division", justDivision,
    tripleDigitPositiveWholeNumbers, divisorDoubleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const EXPERT_DIVISION = new BasicRoundLevel("Expert Division", justDivision,
    tripleDigitPositiveWholeNumbers, divisorTripleDigitLimitations,
    onlyPositiveWholeNumberResult);

/**
 * Fractions
 */
let justFractionAddition: FractionOperator[] = [FRACTION_ADDITION];
let fractionNumEasyOperandLimitations = new BasicOperandLimitations(true, 1, false, true);
let fractionDenEasyOperandLimitations = new BasicOperandLimitations(true, 1, false, false);
let fractionEasyOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenEasyOperandLimitations);
let fractionNumEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionDenEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionEasyResultLimitations = new FractionResultLimitations(fractionNumEasyResultLimitations,
  fractionDenEasyResultLimitations);
export const EASY_FRACTION_ADDITION = new FractionRoundLevel("Easy Fraction Addition", justFractionAddition,
  fractionEasyOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations);


// No level 0
export const LEVEL_ORDER = [
  null,
  EASY_ADDITION,
  MEDIUM_ADDITION,
  CHALLENGING_ADDITION,
  HARD_ADDITION,
  EXPERT_ADDITION,
  EASY_SUBTRACTION,
  MEDIUM_SUBTRACTION,
  CHALLENGING_SUBTRACTION,
  HARD_SUBTRACTION,
  EXPERT_SUBTRACTION,
  EASY_MULTIPLICATION,
  MEDIUM_MULTIPLICATION,
  CHALLENGING_MULTIPLICATION,
  HARD_MULTIPLICATION,
  EXPERT_MULTIPLICATION,
  EASY_DIVISION,
  MEDIUM_DIVISION,
  CHALLENGING_DIVISION,
  HARD_DIVISION,
  EXPERT_DIVISION
];

// No level 0
export const FRACTION_LEVEL_ORDER = [
  null,
  EASY_FRACTION_ADDITION
];
