import { BasicRoundLevel } from './basic-round-level';
import { ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION } from './basic-operators';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { BasicOperator } from './basic-operator';
import { BasicResultLimitations } from './basic-result-limitations';
import { FractionRoundLevel } from './fraction-round-level';
import { FractionOperator } from './fraction-operator';
import { FRACTION_ADDITION, FRACTION_SUBTRACTION, FRACTION_MULTIPLICATION, FRACTION_DIVISION } from './fraction-operators';
import { FractionOperandLimitations } from './fraction-operand-limitations';
import { FractionResultLimitations } from './fraction-result-limitations';

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

let justMultiplication: BasicOperator[] = [MULTIPLICATION];
export const EASY_MULTIPLICATION = new BasicRoundLevel("Easy Multiplication", justMultiplication, 25,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const MEDIUM_MULTIPLICATION = new BasicRoundLevel("Medium Multiplication", justMultiplication, 15,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_MULTIPLICATION = new BasicRoundLevel("Challenging Multiplication", justMultiplication, 10,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const HARD_MULTIPLICATION = new BasicRoundLevel("Hard Multiplication", justMultiplication, 7,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_MULTIPLICATION = new BasicRoundLevel("Expert Multiplication", justMultiplication, 5,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justDivision: BasicOperator[] = [DIVISION];
let divisorSingleDigitLimitations = new BasicOperandLimitations(true, 9, false, false);
let divisorDoubleDigitLimitations = new BasicOperandLimitations(true, 99, false, false);
let divisorTripleDigitLimitations = new BasicOperandLimitations(true, 999, false, false);
let onlyPositiveWholeNumberResult = new BasicResultLimitations(true, false);
export const EASY_DIVISION = new BasicRoundLevel("Easy Division", justDivision, 25,
    singleDigitPositiveWholeNumbers, divisorSingleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const MEDIUM_DIVISION = new BasicRoundLevel("Medium Division", justDivision, 15,
    doubleDigitPositiveWholeNumbers, divisorSingleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const CHALLENGING_DIVISION = new BasicRoundLevel("Challenging Division", justDivision, 10,
    doubleDigitPositiveWholeNumbers, divisorDoubleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const HARD_DIVISION = new BasicRoundLevel("Hard Division", justDivision, 7,
    tripleDigitPositiveWholeNumbers, divisorDoubleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const EXPERT_DIVISION = new BasicRoundLevel("Expert Division", justDivision, 5,
    tripleDigitPositiveWholeNumbers, divisorTripleDigitLimitations,
    onlyPositiveWholeNumberResult);

/**
 * Fractions
 */
let justFractionAddition: FractionOperator[] = [FRACTION_ADDITION];
let fractionNumEasyOperandLimitations = new BasicOperandLimitations(true, 9, false, true);
let fractionDenEasyOperandLimitations = new BasicOperandLimitations(true, 4, false, false);
let fractionEasyOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenEasyOperandLimitations);
let fractionNumEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionDenEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionEasyResultLimitations = new FractionResultLimitations(fractionNumEasyResultLimitations,
  fractionDenEasyResultLimitations);
export const EASY_FRACTION_ADDITION = new FractionRoundLevel("Easy Fraction Addition", justFractionAddition,
  10, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations);

let fractionDenMediumOperandLimitations = new BasicOperandLimitations(true, 9, false, true);
let fractionMediumOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenMediumOperandLimitations);
export const MEDIUM_FRACTION_ADDITION = new FractionRoundLevel("Medium Fraction Addition", justFractionAddition,
  8, fractionMediumOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_ADDITION = new FractionRoundLevel("Challenging Fraction Addition", justFractionAddition,
  6, fractionMediumOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations);

let fractionNumMediumOperandLimitations = new BasicOperandLimitations(true, 19, false, true);
let fractionChallengingOperandLimitations = new FractionOperandLimitations(fractionNumMediumOperandLimitations,
  fractionDenMediumOperandLimitations);
export const HARD_FRACTION_ADDITION = new FractionRoundLevel("Hard Fraction Addition", justFractionAddition,
  4, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations);

export const EXPERT_FRACTION_ADDITION = new FractionRoundLevel("Expert Fraciton Addition", justFractionAddition,
  3, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionEasyResultLimitations);

let justFractionSubtraction: FractionOperator[] = [FRACTION_SUBTRACTION];
let fractionSubtractionNumResultLimitations = new BasicResultLimitations(true, true);
let fractionSubtractionDenResultLimitations = new BasicResultLimitations(true, false);
let fractionSubtractionResultLimitations = new FractionResultLimitations(fractionSubtractionNumResultLimitations,
  fractionSubtractionDenResultLimitations);
export const EASY_FRACTION_SUBTRACTION = new FractionRoundLevel("Easy Fraction Subtraction", justFractionSubtraction,
  10, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionSubtractionResultLimitations);

export const MEDIUM_FRACTION_SUBTRACTION = new FractionRoundLevel("Medium Fraction Subtraction", justFractionSubtraction,
  8, fractionMediumOperandLimitations, fractionEasyOperandLimitations,
  fractionSubtractionResultLimitations);

export const CHALLENGING_FRACTION_SUBTRACTION = new FractionRoundLevel("Challenging Fraction Subtraction", justFractionSubtraction,
  6, fractionMediumOperandLimitations, fractionMediumOperandLimitations,
  fractionSubtractionResultLimitations);

export const HARD_FRACTION_SUBTRACTION = new FractionRoundLevel("Hard Fraction Subtraction", justFractionSubtraction,
  4, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionSubtractionResultLimitations);

export const EXPERT_FRACTION_SUBTRACTION = new FractionRoundLevel("Expert Fraction Subtraction", justFractionSubtraction,
  3, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionSubtractionResultLimitations);

let justFractionMultiplication: FractionOperator[] = [FRACTION_MULTIPLICATION];
export const EASY_FRACTION_MULTIPLICATION = new FractionRoundLevel("Easy Fraction Multiplication", justFractionMultiplication,
  14, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations);

export const MEDIUM_FRACTION_MULTIPLICATION = new FractionRoundLevel("Medium Fraction Multiplication", justFractionMultiplication,
  10, fractionMediumOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_MULTIPLICATION = new FractionRoundLevel("Challenging Fraciton Multiplication",
  justFractionMultiplication, 8, fractionMediumOperandLimitations,
  fractionMediumOperandLimitations, fractionEasyResultLimitations);

export const HARD_FRACTION_MULTIPLICATION = new FractionRoundLevel("Hard Fraction Multiplication", justFractionMultiplication,
  5, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations);

export const EXPERT_FRACTION_MULTIPLICATION = new FractionRoundLevel("Expert Fraction Multiplication", justFractionMultiplication,
  3, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionEasyResultLimitations);

let fractionEasyDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 4, false, false);
let fractionEasyDivisionOperandLimitations = new FractionOperandLimitations(fractionEasyDivisionBasicOperandLimitations,
  fractionEasyDivisionBasicOperandLimitations);
let fractionMediumDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 9, false, false);
let fractionMediumDivisionOperandLimitations = new FractionOperandLimitations(fractionMediumDivisionBasicOperandLimitations,
  fractionMediumDivisionBasicOperandLimitations);
let fractionChallengingDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 19, false, false);
let fractionChallengingDivisionOperandLimitations = new FractionOperandLimitations(fractionChallengingDivisionBasicOperandLimitations,
  fractionChallengingDivisionBasicOperandLimitations);
let justFractionDivision: FractionOperator[] = [FRACTION_DIVISION];
export const EASY_FRACTION_DIVISION = new FractionRoundLevel("Easy Fraction Division", justFractionDivision,
  10, fractionEasyDivisionOperandLimitations, fractionEasyDivisionOperandLimitations,
  fractionEasyResultLimitations);

export const MEDIUM_FRACTION_DIVISION = new FractionRoundLevel("Medium Fraction Division", justFractionDivision,
  8, fractionMediumDivisionOperandLimitations, fractionEasyDivisionOperandLimitations,
  fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_DIVISION = new FractionRoundLevel("Challenging Fraction Division", justFractionDivision,
  6, fractionMediumDivisionOperandLimitations, fractionMediumDivisionOperandLimitations,
  fractionEasyResultLimitations);

export const HARD_FRACTION_DIVISION = new FractionRoundLevel("Hard Fraction Division", justFractionDivision,
  4, fractionChallengingDivisionOperandLimitations,
  fractionMediumDivisionOperandLimitations, fractionEasyResultLimitations);

export const EXPERT_FRACTION_DIVISION = new FractionRoundLevel("Expert Fraction Division", justFractionDivision,
  3, fractionChallengingDivisionOperandLimitations,
  fractionChallengingDivisionOperandLimitations, fractionEasyResultLimitations);

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

export const BASIC_ADDITION_LEVEL_ORDER = [
  null,
  EASY_ADDITION,
  MEDIUM_ADDITION,
  CHALLENGING_ADDITION,
  HARD_ADDITION,
  EXPERT_ADDITION
];

export const BASIC_SUBTRACTION_LEVEL_ORDER = [
  null,
  EASY_SUBTRACTION,
  MEDIUM_SUBTRACTION,
  CHALLENGING_SUBTRACTION,
  HARD_SUBTRACTION,
  EXPERT_SUBTRACTION
];

export const BASIC_MULTIPLICATION_LEVEL_ORDER = [
  null,
  EASY_MULTIPLICATION,
  MEDIUM_MULTIPLICATION,
  CHALLENGING_MULTIPLICATION,
  HARD_MULTIPLICATION,
  EXPERT_MULTIPLICATION
];

export const BASIC_DIVISION_LEVEL_ORDER = [
  null,
  EASY_DIVISION,
  MEDIUM_DIVISION,
  CHALLENGING_DIVISION,
  HARD_DIVISION,
  EXPERT_DIVISION
];

// No level 0
export const FRACTION_LEVEL_ORDER = [
  null,
  EASY_FRACTION_ADDITION,
  MEDIUM_FRACTION_ADDITION,
  CHALLENGING_FRACTION_ADDITION,
  HARD_FRACTION_ADDITION,
  EXPERT_FRACTION_ADDITION,
  EASY_FRACTION_SUBTRACTION,
  MEDIUM_FRACTION_SUBTRACTION,
  CHALLENGING_FRACTION_SUBTRACTION,
  HARD_FRACTION_SUBTRACTION,
  EXPERT_FRACTION_SUBTRACTION,
  EASY_FRACTION_MULTIPLICATION,
  MEDIUM_FRACTION_MULTIPLICATION,
  CHALLENGING_FRACTION_MULTIPLICATION,
  HARD_FRACTION_MULTIPLICATION,
  EXPERT_FRACTION_MULTIPLICATION,
  EASY_FRACTION_DIVISION,
  MEDIUM_FRACTION_DIVISION,
  CHALLENGING_FRACTION_DIVISION,
  HARD_FRACTION_DIVISION,
  EXPERT_FRACTION_DIVISION
];

export const FRACTION_ADDITION_LEVEL_ORDER = [
  null,
  EASY_FRACTION_ADDITION,
  MEDIUM_FRACTION_ADDITION,
  CHALLENGING_FRACTION_ADDITION,
  HARD_FRACTION_ADDITION,
  EXPERT_FRACTION_ADDITION
];

export const FRACTION_SUBTRACTION_LEVEL_ORDER = [
  null,
  EASY_FRACTION_SUBTRACTION,
  MEDIUM_FRACTION_SUBTRACTION,
  CHALLENGING_FRACTION_SUBTRACTION,
  HARD_FRACTION_SUBTRACTION,
  EXPERT_FRACTION_SUBTRACTION
];

export const FRACTION_MULTIPLICATION_LEVEL_ORDER = [
  null,
  EASY_FRACTION_MULTIPLICATION,
  MEDIUM_FRACTION_MULTIPLICATION,
  CHALLENGING_FRACTION_MULTIPLICATION,
  HARD_FRACTION_MULTIPLICATION,
  EXPERT_FRACTION_MULTIPLICATION
];

export const FRACTION_DIVISION_LEVEL_ORDER = [
  null,
  EASY_FRACTION_DIVISION,
  MEDIUM_FRACTION_DIVISION,
  CHALLENGING_FRACTION_DIVISION,
  HARD_FRACTION_DIVISION,
  EXPERT_FRACTION_DIVISION
];
