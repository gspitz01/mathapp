import { BasicMultiplicationRoundLevel } from "./basic-multiplication-round-level";
import { PLURAL_NUMBER_NAMES } from "../constants";

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


export const BASIC_MULTIPLICATION_LEVEL_ORDER = [];

const difficultyNames = ["Easy", "Medium", "Hard"];
const difficultyThresholds = [[20, 15], [15, 10], [15, 10]];
const factorLimits = [[0, 12], [10, 25], [0, 25]];


let levelFocusNumber = 2;
let thresholdIndex = 0;
for (let roundLevelName of PLURAL_NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    thresholdIndex = 1;
  }
  for (let i = 0; i < difficultyNames.length; i++) {
    BASIC_MULTIPLICATION_LEVEL_ORDER.push(new BasicMultiplicationRoundLevel(
      difficultyNames[i] + " Multiplication: " + roundLevelName,
      difficultyThresholds[i][thresholdIndex], levelFocusNumber, factorLimits[i][0], factorLimits[i][1]));
  }
  levelFocusNumber++;
}
