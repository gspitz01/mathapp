import { NUMBER_NAMES, PLURAL_NUMBER_NAMES } from "../constants";
import { BasicDivisionRoundLevel } from "./basic-division-round-level";

export const BASIC_DIVISION_LEVEL_ORDER = [];

const difficultyNames = ["Easy", "Medium", "Challenging", "Hard", "Expert"];
const difficultyThresholds = [[20, 15], [15, 10], [15, 10], [15, 10], [15, 10]];
const factorLimits = [[0, 12], [10, 20], [10, 30], [10, 50], [10, 100]];

let levelFocusNumber = 2;
let thresholdIndex = 0;
for (let roundLevelName of NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    thresholdIndex = 1;
  }

  let numberLevelOrder = [];
  for (let i = 0; i < difficultyNames.length; i++) {
    numberLevelOrder.push(new BasicDivisionRoundLevel(
      difficultyNames[i] + " Division By " + roundLevelName,
      difficultyThresholds[i][thresholdIndex], levelFocusNumber, factorLimits[i][0], factorLimits[i][1]));
  }

  BASIC_DIVISION_LEVEL_ORDER.push(numberLevelOrder);
  levelFocusNumber++;
}
