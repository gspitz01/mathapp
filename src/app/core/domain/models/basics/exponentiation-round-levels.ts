import { ORDINAL_NUMBER_NAMES } from '../constants';
import { ExponentiationRoundLevel } from './exponentiation-round-level';

export const EXPONENTIATION_LEVEL_ORDER = [];

const difficultyNames = ['Easy', 'Medium', 'Hard'];
const difficultyThresholds = [10, 10, 10];
const baseLimits = [[0, 5], [0, 10], [0, 15]];

let levelFocusNumber = 2;
for (const numberName of ORDINAL_NUMBER_NAMES) {
  const numberLevelOrder = [];
  for (let i = 0; i < difficultyNames.length; i++) {
    numberLevelOrder.push(new ExponentiationRoundLevel(
      `${difficultyNames[i]} Exponentiation to the ${numberName} Power`,
      difficultyThresholds[i], levelFocusNumber, baseLimits[i][0],
      baseLimits[i][1]));
  }
  EXPONENTIATION_LEVEL_ORDER.push(numberLevelOrder);
  levelFocusNumber++;
}
