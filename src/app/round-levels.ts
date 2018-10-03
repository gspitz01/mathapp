import { RoundLevel } from './round-level';
import { ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION } from './basic-operators';
import { OperandLimitations } from './operand-limitations';
import { Operator } from './operator';
import { ResultLimitations } from './result-limitations';

let justAddition: Operator[] = [ADDITION];
let singleDigitPositiveWholeNumbers = new OperandLimitations(true, 1, false, true);
export const EASY_ADDITION = new RoundLevel("Easy Addition", justAddition,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

let doubleDigitPositiveWholeNumbers = new OperandLimitations(true, 2, false, true);
export const MEDIUM_ADDITION = new RoundLevel("Medium Addition", justAddition,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_ADDITION = new RoundLevel("Challenging Addition", justAddition,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

let tripleDigitPositiveWholeNumbers = new OperandLimitations(true, 3, false, true);
export const HARD_ADDITION = new RoundLevel("Hard Addition", justAddition,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_ADDITION = new RoundLevel("Expert Addition", justAddition,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justSubtraction: Operator[] = [SUBTRACTION];
export const EASY_SUBTRACTION = new RoundLevel("Easy Subtraction", justSubtraction,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const MEDIUM_SUBTRACTION = new RoundLevel("Medium Subtraction", justSubtraction,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_SUBTRACTION = new RoundLevel("Challenging Subtraction", justSubtraction,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const HARD_SUBTRACTION = new RoundLevel("Hard Subtraction", justSubtraction,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_SUBTRACTION = new RoundLevel("Expert Subtraction", justSubtraction,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justMultiplication: Operator[] = [MULTIPLICATION];
export const EASY_MULTIPLICATION = new RoundLevel("Easy Multiplication", justMultiplication,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const MEDIUM_MULTIPLICATION = new RoundLevel("Medium Multiplication", justMultiplication,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

export const CHALLENGING_MULTIPLICATION = new RoundLevel("Challenging Multiplication", justMultiplication,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const HARD_MULTIPLICATION = new RoundLevel("Hard Multiplication", justMultiplication,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

export const EXPERT_MULTIPLICATION = new RoundLevel("Expert Multiplication", justMultiplication,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);

let justDivision: Operator[] = [DIVISION];
let divisorSingleDigitLimitations = new OperandLimitations(true, 1, false, false);
let divisorDoubleDigitLimitations = new OperandLimitations(true, 2, false, false);
let divisorTripleDigitLimitations = new OperandLimitations(true, 3, false, false);
let onlyPositiveWholeNumberResult = new ResultLimitations(true, false);
export const EASY_DIVISION = new RoundLevel("Easy Division", justDivision,
    singleDigitPositiveWholeNumbers, divisorSingleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const MEDIUM_DIVISION = new RoundLevel("Medium Division", justDivision,
    doubleDigitPositiveWholeNumbers, divisorSingleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const CHALLENGING_DIVISION = new RoundLevel("Challenging Division", justDivision,
    doubleDigitPositiveWholeNumbers, divisorDoubleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const HARD_DIVISION = new RoundLevel("Hard Division", justDivision,
    tripleDigitPositiveWholeNumbers, divisorDoubleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const EXPERT_DIVISION = new RoundLevel("Expert Division", justDivision,
    tripleDigitPositiveWholeNumbers, divisorTripleDigitLimitations,
    onlyPositiveWholeNumberResult);

export const LEVEL_ORDER = [
  EASY_ADDITION,
  MEDIUM_ADDITION,
  CHALLENGING_ADDITION,
  HARD_ADDITION,
  EXPERT_ADDITION,
  EASY_SUBTRACTION,
  MEDIUM_SUBTRACTION,
  CHALLENGING_MULTIPLICATION,
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
]
