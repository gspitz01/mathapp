import { FractionOperator } from './fraction-operator';
import { FRACTION_ADDITION, FRACTION_SUBTRACTION, FRACTION_MULTIPLICATION, FRACTION_DIVISION } from './fraction-operators';
import { FractionOperandLimitations } from './fraction-operand-limitations';
import { FractionResultLimitations } from './fraction-result-limitations';
import { FractionRoundLevel } from './fraction-round-level';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';
import { BasicResultLimitations } from '../basics/basic-result-limitations';

/**
 * Fractions
 */

// Operators
const justFractionAddition: FractionOperator[] = [FRACTION_ADDITION];
const justFractionSubtraction: FractionOperator[] = [FRACTION_SUBTRACTION];
const justFractionMultiplication: FractionOperator[] = [FRACTION_MULTIPLICATION];
const justFractionDivision: FractionOperator[] = [FRACTION_DIVISION];

// Numerator and Denominator Operand Limitations
const fractionNumEasyOperandLimitations = new BasicOperandLimitations(true, 0, 9, false);
const fractionDenEasyOperandLimitations = new BasicOperandLimitations(true, 1, 4, false);
const fractionNumMediumOperandLimitations = new BasicOperandLimitations(true, 0, 19, false);
const fractionDenMediumOperandLimitations = new BasicOperandLimitations(true, 1, 9, false);
const fractionEasyDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 1, 4, false);
const fractionMediumDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 1, 9, false);
const fractionChallengingDivisionBasicOperandLimitations = new BasicOperandLimitations(true, 1, 19, false);

// Fraction Operand Limitations
const fractionEasyOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenEasyOperandLimitations);
const fractionMediumOperandLimitations = new FractionOperandLimitations(fractionNumEasyOperandLimitations,
  fractionDenMediumOperandLimitations);
const fractionChallengingOperandLimitations = new FractionOperandLimitations(fractionNumMediumOperandLimitations,
  fractionDenMediumOperandLimitations);
const fractionEasyDivisionOperandLimitations = new FractionOperandLimitations(fractionEasyDivisionBasicOperandLimitations,
  fractionEasyDivisionBasicOperandLimitations);
const fractionMediumDivisionOperandLimitations = new FractionOperandLimitations(fractionMediumDivisionBasicOperandLimitations,
  fractionMediumDivisionBasicOperandLimitations);
const fractionChallengingDivisionOperandLimitations = new FractionOperandLimitations(fractionChallengingDivisionBasicOperandLimitations,
  fractionChallengingDivisionBasicOperandLimitations);

// Numerator and Denominator Result Limitations
const fractionNumEasyResultLimitations = new BasicResultLimitations(true, false);
const fractionDenEasyResultLimitations = new BasicResultLimitations(true, false);
const fractionSubtractionNumResultLimitations = new BasicResultLimitations(true, true);
const fractionSubtractionDenResultLimitations = new BasicResultLimitations(true, false);

      // Fraction Result Limitations
const fractionEasyResultLimitations = new FractionResultLimitations(fractionNumEasyResultLimitations,
  fractionDenEasyResultLimitations);
const fractionSubtractionResultLimitations = new FractionResultLimitations(fractionSubtractionNumResultLimitations,
  fractionSubtractionDenResultLimitations);

// Addition
export const EASY_FRACTION_ADDITION = new FractionRoundLevel('Easy Fraction Addition', justFractionAddition,
  10, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations, 7);

export const MEDIUM_FRACTION_ADDITION = new FractionRoundLevel('Medium Fraction Addition', justFractionAddition,
  8, fractionMediumOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations, 6);

export const CHALLENGING_FRACTION_ADDITION = new FractionRoundLevel('Challenging Fraction Addition', justFractionAddition,
  6, fractionMediumOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations, 5);

export const HARD_FRACTION_ADDITION = new FractionRoundLevel('Hard Fraction Addition', justFractionAddition,
  4, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations, 4);

export const EXPERT_FRACTION_ADDITION = new FractionRoundLevel('Expert Fraction Addition', justFractionAddition,
  3, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionEasyResultLimitations, 3);

// Subtraction
export const EASY_FRACTION_SUBTRACTION = new FractionRoundLevel('Easy Fraction Subtraction', justFractionSubtraction,
  10, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionSubtractionResultLimitations, 7);

export const MEDIUM_FRACTION_SUBTRACTION = new FractionRoundLevel('Medium Fraction Subtraction', justFractionSubtraction,
  8, fractionMediumOperandLimitations, fractionEasyOperandLimitations,
  fractionSubtractionResultLimitations, 6);

export const CHALLENGING_FRACTION_SUBTRACTION = new FractionRoundLevel('Challenging Fraction Subtraction', justFractionSubtraction,
  6, fractionMediumOperandLimitations, fractionMediumOperandLimitations,
  fractionSubtractionResultLimitations, 5);

export const HARD_FRACTION_SUBTRACTION = new FractionRoundLevel('Hard Fraction Subtraction', justFractionSubtraction,
  4, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionSubtractionResultLimitations, 4);

export const EXPERT_FRACTION_SUBTRACTION = new FractionRoundLevel('Expert Fraction Subtraction', justFractionSubtraction,
  3, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionSubtractionResultLimitations, 3);

// Multiplication
export const EASY_FRACTION_MULTIPLICATION = new FractionRoundLevel('Easy Fraction Multiplication', justFractionMultiplication,
  10, fractionEasyOperandLimitations, fractionEasyOperandLimitations,
  fractionEasyResultLimitations, 7);

export const MEDIUM_FRACTION_MULTIPLICATION = new FractionRoundLevel('Medium Fraction Multiplication', justFractionMultiplication,
  10, fractionMediumOperandLimitations, fractionEasyOperandLimitations, fractionEasyResultLimitations, 6);

export const CHALLENGING_FRACTION_MULTIPLICATION = new FractionRoundLevel('Challenging Fraciton Multiplication',
  justFractionMultiplication, 10, fractionMediumOperandLimitations,
  fractionMediumOperandLimitations, fractionEasyResultLimitations, 5);

export const HARD_FRACTION_MULTIPLICATION = new FractionRoundLevel('Hard Fraction Multiplication', justFractionMultiplication,
  10, fractionChallengingOperandLimitations, fractionMediumOperandLimitations,
  fractionEasyResultLimitations, 4);

export const EXPERT_FRACTION_MULTIPLICATION = new FractionRoundLevel('Expert Fraction Multiplication', justFractionMultiplication,
  10, fractionChallengingOperandLimitations, fractionChallengingOperandLimitations,
  fractionEasyResultLimitations, 3);

// Division
export const EASY_FRACTION_DIVISION = new FractionRoundLevel('Easy Fraction Division', justFractionDivision,
  10, fractionEasyDivisionOperandLimitations, fractionEasyDivisionOperandLimitations,
  fractionEasyResultLimitations, 7);

export const MEDIUM_FRACTION_DIVISION = new FractionRoundLevel('Medium Fraction Division', justFractionDivision,
  8, fractionMediumDivisionOperandLimitations, fractionEasyDivisionOperandLimitations,
  fractionEasyResultLimitations, 6);

export const CHALLENGING_FRACTION_DIVISION = new FractionRoundLevel('Challenging Fraction Division', justFractionDivision,
  6, fractionMediumDivisionOperandLimitations, fractionMediumDivisionOperandLimitations,
  fractionEasyResultLimitations, 5);

export const HARD_FRACTION_DIVISION = new FractionRoundLevel('Hard Fraction Division', justFractionDivision,
  4, fractionChallengingDivisionOperandLimitations,
  fractionMediumDivisionOperandLimitations, fractionEasyResultLimitations, 4);

export const EXPERT_FRACTION_DIVISION = new FractionRoundLevel('Expert Fraction Division', justFractionDivision,
  3, fractionChallengingDivisionOperandLimitations,
  fractionChallengingDivisionOperandLimitations, fractionEasyResultLimitations, 3);

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
