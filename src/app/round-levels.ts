import { RoundLevel } from './round-level';
import { ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION } from './basic-operators';
import { OperandLimitations } from './operand-limitations';
import { Operator } from './operator';
import { ResultLimitations } from './result-limitations';

let justAddition: Operator[] = [ADDITION];
let singleDigitPositiveWholeNumbers = new OperandLimitations(true, 1, false);
let level1 = new RoundLevel(1, "Easy Addition", justAddition,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);
export const LEVEL_1 = level1;
export const EASY_ADDITION = level1;

let doubleDigitPositiveWholeNumbers = new OperandLimitations(true, 2, false);
let level2 = new RoundLevel(2, "Medium Addition", justAddition,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);
export const LEVEL_2 = level2;
export const MEDIUM_ADDITION = level2;

let level3 = new RoundLevel(3, "Challenging Addition", justAddition,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);
export const LEVEL_3 = level3;
export const CHALLENGING_ADDITION = level3;

let tripleDigitPositiveWholeNumbers = new OperandLimitations(true, 3, false);
let level4 = new RoundLevel(4, "Hard Addition", justAddition,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);
export const LEVEL_4 = level4;
export const HARD_ADDITION = level4;

let level5 = new RoundLevel(5, "Expert Addition", justAddition,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);
export const LEVEL_5 = level5;
export const EXPERT_ADDITION = level5;

let justSubtraction: Operator[] = [SUBTRACTION];
let level16 = new RoundLevel(16, "Easy Subtraction", justSubtraction,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);
export const LEVEL_16 = level16;
export const EASY_SUBTRACTION = level16;

let level17 = new RoundLevel(17, "Medium Subtraction", justSubtraction,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);
export const LEVEL_17 = level17;
export const MEDIUM_SUBTRACTION = level17;

let level18 = new RoundLevel(18, "Challenging Subtraction", justSubtraction,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);
export const LEVEL_18 = level18;
export const CHALLENGING_SUBTRACTION = level18;

let level19 = new RoundLevel(19, "Hard Subtraction", justSubtraction,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);
export const LEVEL_19 = level19;
export const HARD_SUBTRACTION = level19;

let level20 = new RoundLevel(20, "Expert Subtraction", justSubtraction,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);
export const LEVEL_20 = level20;
export const EXPERT_SUBTRACTION = level20;

let justMultiplication: Operator[] = [MULTIPLICATION];
let level31 = new RoundLevel(31, "Easy Multiplication", justMultiplication,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);
export const LEVEL_31 = level31;
export const EASY_MULTIPLICATION = level31;

let level32 = new RoundLevel(32, "Medium Multiplication", justMultiplication,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);
export const LEVEL_32 = level32;
export const MEDIUM_MULTIPLICATION = level32;

let level33 = new RoundLevel(33, "Challenging Multiplication", justMultiplication,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);
export const LEVEL_33 = level33;
export const CHALLENGING_MULTIPLICATION = level33;

let level34 = new RoundLevel(34, "Hard Multiplication", justMultiplication,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);
export const LEVEL_34 = level34;
export const HARD_MULTIPLICATION = level34;

let level35 = new RoundLevel(35, "Expert Multiplication", justMultiplication,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);
export const LEVEL_35 = level35;
export const EXPERT_MULTIPLICATION = level35;

let justDivision: Operator[] = [DIVISION];
let onlyPositiveWholeNumberResult = new ResultLimitations(true, false);
let level46 = new RoundLevel(46, "Easy Division", justDivision,
    singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers,
    onlyPositiveWholeNumberResult);
export const LEVEL_46 = level46;
export const EASY_DIVISION = level46;

let level47 = new RoundLevel(47, "Medium Division", justDivision,
    doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers,
    onlyPositiveWholeNumberResult);
export const LEVEL_47 = level47;
export const MEDIUM_DIVISION = level47;

let level48 = new RoundLevel(48, "Challenging Division", justDivision,
    doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers,
    onlyPositiveWholeNumberResult);
export const LEVEL_48 = level48;
export const CHALLENGING_DIVISION = level48;

let level49 = new RoundLevel(49, "Hard Division", justDivision,
    tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers,
    onlyPositiveWholeNumberResult);
export const LEVEL_49 = level49;
export const HARD_DIVISION = level49;

let level50 = new RoundLevel(50, "Expert Division", justDivision,
    tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers,
    onlyPositiveWholeNumberResult);
export const LEVEL_50 = level50;
export const EXPERT_DIVISION = level50;
