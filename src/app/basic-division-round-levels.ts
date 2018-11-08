import { NUMBER_NAMES } from "./constants";
import { BasicDivisionRoundLevel } from "./basic-division-round-level";

export const BASIC_DIVISION_LEVEL_ORDER = [null];

// First set of levels
let levelFocusNumber = 2;
let threshold = 25;
let lowerResultLimit = 0;
let upperResultLimit = 12;
for (let numberName of NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    threshold = 20;
  }
  BASIC_DIVISION_LEVEL_ORDER.push(new BasicDivisionRoundLevel("By " + numberName, threshold, levelFocusNumber,
    lowerResultLimit, upperResultLimit));
  levelFocusNumber++;
}

// Second set of levels
levelFocusNumber = 2;
threshold = 20;
lowerResultLimit = 10;
upperResultLimit = 25;
for (let numberName of NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    threshold = 15;
  }
  BASIC_DIVISION_LEVEL_ORDER.push(new BasicDivisionRoundLevel("Meidum By " + numberName, threshold, levelFocusNumber,
    lowerResultLimit, upperResultLimit));
  levelFocusNumber++;
}

levelFocusNumber = 2;
threshold = 20;
lowerResultLimit = 0;
upperResultLimit = 25;
for (let numberName of NUMBER_NAMES) {
  if (levelFocusNumber > 12) {
    threshold = 15;
  }
  BASIC_DIVISION_LEVEL_ORDER.push(new BasicDivisionRoundLevel("Hard By " + numberName, threshold, levelFocusNumber,
    lowerResultLimit, upperResultLimit));
  levelFocusNumber++;
}