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
export const EASY_ADDITION = new BasicRoundLevel("Easy Addition", justAddition,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

let doubleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 99, false, true);
export const MEDIUM_ADDITION = new BasicRoundLevel("Medium Addition", justAddition,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_ADDITION = new BasicRoundLevel("Challenging Addition", justAddition,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

let tripleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 999, false, true);
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
let divisorSingleDigitLimitations = new BasicOperandLimitations(true, 9, false, false);
let divisorDoubleDigitLimitations = new BasicOperandLimitations(true, 99, false, false);
let divisorTripleDigitLimitations = new BasicOperandLimitations(true, 999, false, false);
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
let fractionNumEasyOperandLimitations = new BasicOperandLimitations(true, 9, false, true);
let fractionDenEasyOperandLimitations = new BasicOperandLimitations(true, 4, false, false);
let fractionEasyOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenEasyOperandLimitations);
let fractionNumEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionDenEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionEasyResultLimitations = new FractionResultLimitations(fractionNumEasyResultLimitations,
  fractionDenEasyResultLimitations);
export const EASY_FRACTION_ADDITION = new FractionRoundLevel("Easy Fraction Addition", justFractionAddition,
  fractionEasyOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations);

let fractionDenMediumOperandLimitations = new BasicOperandLimitations(true, 9, false, true);
let fractionMediumOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenMediumOperandLimitations);
export const MEDIUM_FRACTION_ADDITION = new FractionRoundLevel("Medium Fraction Addition", justFractionAddition,
  fractionMediumOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_ADDITION = new FractionRoundLevel("Challenging Fraction Addition", justFractionAddition,
  fractionMediumOperandLimitations, fractionMediumOperandLimitations, fractionEasyResultLimitations);

let fractionNumMediumOperandLimitations = new BasicOperandLimitations(true, 19, false, true);
let fractionChallengingOperandLimitations = new FractionOperandLimitations(fractionNumMediumOperandLimitations,
  fractionDenMediumOperandLimitations);
export const HARD_FRACTION_ADDITION = new FractionRoundLevel("Hard Fraction Addition", justFractionAddition,
  fractionChallengingOperandLimitations, fractionMediumOperandLimitations, fractionEasyResultLimitations);

export const EXPERT_FRACTION_ADDITION = new FractionRoundLevel("Expert Fraciton Addition", justFractionAddition,
  fractionChallengingOperandLimitations, fractionChallengingOperandLimitations, fractionEasyResultLimitations);

let justFractionSubtraction: FractionOperator[] = [FRACTION_SUBTRACTION];
let fractionSubtractionNumResultLimitations = new BasicResultLimitations(true, true);
let fractionSubtractionDenResultLimitations = new BasicResultLimitations(true, false);
let fractionSubtractionResultLimitations = new FractionResultLimitations(fractionSubtractionNumResultLimitations,
  fractionSubtractionDenResultLimitations);
export const EASY_FRACTION_SUBTRACTION = new FractionRoundLevel("Easy Fraction Subtraction", justFractionSubtraction,
  fractionEasyOperandLimitations, fractionEasyOperandLimitations, fractionSubtractionResultLimitations);

export const MEDIUM_FRACTION_SUBTRACTION = new FractionRoundLevel("Medium Fraction Subtraction", justFractionSubtraction,
  fractionMediumOperandLimitations, fractionEasyOperandLimitations, fractionSubtractionResultLimitations);

export const CHALLENGING_FRACTION_SUBTRACTION = new FractionRoundLevel("Challenging Fraction Subtraction", justFractionSubtraction,
  fractionMediumOperandLimitations, fractionMediumOperandLimitations, fractionSubtractionResultLimitations);

export const HARD_FRACTION_SUBTRACTION = new FractionRoundLevel("Hard Fraction Subtraction", justFractionSubtraction,
  fractionChallengingOperandLimitations, fractionMediumOperandLimitations, fractionSubtractionResultLimitations);

export const EXPERT_FRACTION_SUBTRACTION = new FractionRoundLevel("Expert Fraction Subtraction", justFractionSubtraction,
  fractionChallengingOperandLimitations, fractionChallengingOperandLimitations, fractionSubtractionResultLimitations);

let justFractionMultiplication: FractionOperator[] = [FRACTION_MULTIPLICATION];
export const EASY_FRACTION_MULTIPLICATION = new FractionRoundLevel("Easy Fraction Multiplication", justFractionMultiplication,
  fractionEasyOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations);

export const MEDIUM_FRACTION_MULTIPLICATION = new FractionRoundLevel("Medium Fraction Multiplication", justFractionMultiplication,
  fractionMediumOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_MULTIPLICATION = new FractionRoundLevel("Challenging Fraciton Multiplication",
  justFractionMultiplication, fractionMediumOperandLimitations, fractionMediumOperandLimitations, fractionEasyResultLimitations);

export const HARD_FRACTION_MULTIPLICATION = new FractionRoundLevel("Hard Fraction Multiplication", justFractionMultiplication,
  fractionChallengingOperandLimitations, fractionMediumOperandLimitations, fractionEasyResultLimitations);

export const EXPERT_FRACTION_MULTIPLICATION = new FractionRoundLevel("Expert Fraction Multiplication", justFractionMultiplication,
  fractionChallengingOperandLimitations, fractionChallengingOperandLimitations, fractionEasyResultLimitations);

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
  fractionEasyDivisionOperandLimitations, fractionEasyDivisionOperandLimitations, fractionEasyResultLimitations);

export const MEDIUM_FRACTION_DIVISION = new FractionRoundLevel("Medium Fraction Division", justFractionDivision,
  fractionMediumDivisionOperandLimitations, fractionEasyDivisionOperandLimitations, fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_DIVISION = new FractionRoundLevel("Challenging Fraction Division", justFractionDivision,
  fractionMediumDivisionOperandLimitations, fractionMediumDivisionOperandLimitations, fractionEasyResultLimitations);

export const HARD_FRACTION_DIVISION = new FractionRoundLevel("Hard Fraction Division", justFractionDivision,
  fractionChallengingDivisionOperandLimitations, fractionMediumDivisionOperandLimitations, fractionEasyResultLimitations);

export const EXPERT_FRACTION_DIVISION = new FractionRoundLevel("Expert Fraction Division", justFractionDivision,
  fractionChallengingDivisionOperandLimitations, fractionChallengingDivisionOperandLimitations, fractionEasyResultLimitations);

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
