import { FractionOperator } from "./fraction-operator";
import { FRACTION_ADDITION, FRACTION_SUBTRACTION, FRACTION_MULTIPLICATION, FRACTION_DIVISION } from "./fraction-operators";
import { BasicOperandLimitations } from "src/app/shared/models/basic-operand-limitations";
import { FractionOperandLimitations } from "./fraction-operand-limitations";
import { BasicResultLimitations } from "src/app/shared/models/basic-result-limitations";
import { FractionResultLimitations } from "./fraction-result-limitations";
import { FractionRoundLevel } from './fraction-round-level';

/**
 * Fractions
 */

// Operators
let justFractionAddition: FractionOperator[] = [FRACTION_ADDITION];
let justFractionSubtraction: FractionOperator[] = [FRACTION_SUBTRACTION];
let justFractionMultiplication: FractionOperator[] = [FRACTION_MULTIPLICATION];
let justFractionDivision: FractionOperator[] = [FRACTION_DIVISION];

// Numerator and Denominator Operand Limitations
let fractionNumEasyOperandLimitations = new BasicOperandLimitations(true, 9, false, true);
let fractionDenEasyOperandLimitations = new BasicOperandLimitations(true, 4, false, false);
let fractionNumMediumOperandLimitations = new BasicOperandLimitations(true, 19, false, true);
let fractionDenMediumOperandLimitations = new BasicOperandLimitations(true, 9, false, false);
let fractionEasyDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 4, false, false);
let fractionMediumDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 9, false, false);
let fractionChallengingDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 19, false, false);

// Fraction Operand Limitations
let fractionEasyOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenEasyOperandLimitations);
let fractionMediumOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenMediumOperandLimitations);
let fractionChallengingOperandLimitations = new FractionOperandLimitations(fractionNumMediumOperandLimitations,
  fractionDenMediumOperandLimitations);
let fractionEasyDivisionOperandLimitations = new FractionOperandLimitations(fractionEasyDivisionBasicOperandLimitations,
  fractionEasyDivisionBasicOperandLimitations);
let fractionMediumDivisionOperandLimitations = new FractionOperandLimitations(fractionMediumDivisionBasicOperandLimitations,
  fractionMediumDivisionBasicOperandLimitations);
let fractionChallengingDivisionOperandLimitations = new FractionOperandLimitations(fractionChallengingDivisionBasicOperandLimitations,
  fractionChallengingDivisionBasicOperandLimitations);

// Numerator and Denominator Result Limitations
let fractionNumEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionDenEasyResultLimitations = new BasicResultLimitations(true, false);
let fractionSubtractionNumResultLimitations = new BasicResultLimitations(true, true);
let fractionSubtractionDenResultLimitations = new BasicResultLimitations(true, false);

      // Fraction Result Limitations
let fractionEasyResultLimitations = new FractionResultLimitations(fractionNumEasyResultLimitations,
  fractionDenEasyResultLimitations);
let fractionSubtractionResultLimitations = new FractionResultLimitations(fractionSubtractionNumResultLimitations,
  fractionSubtractionDenResultLimitations);

// Addition
export const EASY_FRACTION_ADDITION = new FractionRoundLevel("Easy Fraction Addition", justFractionAddition,
  10, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations);

export const MEDIUM_FRACTION_ADDITION = new FractionRoundLevel("Medium Fraction Addition", justFractionAddition,
  8, fractionMediumOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations);

export const CHALLENGING_FRACTION_ADDITION = new FractionRoundLevel("Challenging Fraction Addition", justFractionAddition,
  6, fractionMediumOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations);

export const HARD_FRACTION_ADDITION = new FractionRoundLevel("Hard Fraction Addition", justFractionAddition,
  4, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations);

export const EXPERT_FRACTION_ADDITION = new FractionRoundLevel("Expert Fraction Addition", justFractionAddition,
  3, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionEasyResultLimitations);

// Subtraction
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

// Multiplication
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

// Division
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

export const FRACTION_ADDITION_LEVEL_ORDER = [
  EASY_FRACTION_ADDITION,
  MEDIUM_FRACTION_ADDITION,
  CHALLENGING_FRACTION_ADDITION,
  HARD_FRACTION_ADDITION,
  EXPERT_FRACTION_ADDITION
];

export const FRACTION_SUBTRACTION_LEVEL_ORDER = [
  EASY_FRACTION_SUBTRACTION,
  MEDIUM_FRACTION_SUBTRACTION,
  CHALLENGING_FRACTION_SUBTRACTION,
  HARD_FRACTION_SUBTRACTION,
  EXPERT_FRACTION_SUBTRACTION
];

export const FRACTION_MULTIPLICATION_LEVEL_ORDER = [
  EASY_FRACTION_MULTIPLICATION,
  MEDIUM_FRACTION_MULTIPLICATION,
  CHALLENGING_FRACTION_MULTIPLICATION,
  HARD_FRACTION_MULTIPLICATION,
  EXPERT_FRACTION_MULTIPLICATION
];

export const FRACTION_DIVISION_LEVEL_ORDER = [
  EASY_FRACTION_DIVISION,
  MEDIUM_FRACTION_DIVISION,
  CHALLENGING_FRACTION_DIVISION,
  HARD_FRACTION_DIVISION,
  EXPERT_FRACTION_DIVISION
];
