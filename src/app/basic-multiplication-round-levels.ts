import { BasicMultiplicationRoundLevel } from "./basic-multiplication-round-level";
import { PLURAL_NUMBER_NAMES } from "./constants";

// let justMultiplication: BasicOperator[] = [MULTIPLICATION];
// export const EASY_MULTIPLICATION = new BasicRoundLevel("Easy Multiplication", justMultiplication, 25,
//     singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

// export const MEDIUM_MULTIPLICATION = new BasicRoundLevel("Medium Multiplication", justMultiplication, 15,
//     doubleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers, null);

// export const CHALLENGING_MULTIPLICATION = new BasicRoundLevel("Challenging Multiplication", justMultiplication, 10,
//     doubleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

// export const HARD_MULTIPLICATION = new BasicRoundLevel("Hard Multiplication", justMultiplication, 7,
//     tripleDigitPositiveWholeNumbers, doubleDigitPositiveWholeNumbers, null);

// export const EXPERT_MULTIPLICATION = new BasicRoundLevel("Expert Multiplication", justMultiplication, 5,
//     tripleDigitPositiveWholeNumbers, tripleDigitPositiveWholeNumbers, null);


export const BASIC_MULTIPLICATION_LEVEL_ORDER = [null];

// First set of levels
let levelFocusNumber = 2;
let threshold = 20;
let lowerFactorLimit = 0;
let upperFactorLimit = 12;
for (let roundLevelName of PLURAL_NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    threshold = 15;
  }
  BASIC_MULTIPLICATION_LEVEL_ORDER.push(new BasicMultiplicationRoundLevel(roundLevelName, threshold, levelFocusNumber, lowerFactorLimit,
    upperFactorLimit));
  levelFocusNumber++;
}

// Second set of levels
levelFocusNumber = 2;
threshold = 15;
lowerFactorLimit = 10;
upperFactorLimit = 25;
for (let roundLevelName of PLURAL_NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    threshold = 10;
  }
  BASIC_MULTIPLICATION_LEVEL_ORDER.push(new BasicMultiplicationRoundLevel("Medium " + roundLevelName, threshold, levelFocusNumber,
    lowerFactorLimit, upperFactorLimit));
  levelFocusNumber++;
}

// Third set of levels
levelFocusNumber = 2;
threshold = 15;
lowerFactorLimit = 0;
upperFactorLimit = 25;
for (let roundLevelName of PLURAL_NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    threshold = 10;
  }
  BASIC_MULTIPLICATION_LEVEL_ORDER.push(new BasicMultiplicationRoundLevel("Hard " + roundLevelName, threshold, levelFocusNumber,
    lowerFactorLimit, upperFactorLimit));
  levelFocusNumber++;
}

