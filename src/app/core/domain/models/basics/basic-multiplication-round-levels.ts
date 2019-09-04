import { BasicMultiplicationRoundLevel } from './basic-multiplication-round-level';
import { PLURAL_NUMBER_NAMES } from '../constants';

export const BASIC_MULTIPLICATION_LEVEL_ORDER = [];

const difficultyThresholds = [10, 15, 20, 25, 30, 8, 12, 16, 18, 20];
const factorLimits = [[0, 10], [0, 15], [0, 20]];
let levelFocusNumber = 2;
for (const roundLevelName of PLURAL_NUMBER_NAMES) {
  const numberLevelOrder = [];
  let factorLimit = -1;
  for (let i = 0; i < difficultyThresholds.length; i++) {
    if (i % 5 === 0) {
      factorLimit++;
    }
    numberLevelOrder.push(new BasicMultiplicationRoundLevel(
      'Multiplication with ' + roundLevelName + ' Level ' + (i + 1),
      difficultyThresholds[i],
      levelFocusNumber,
      factorLimits[factorLimit][0],
      factorLimits[factorLimit][1]));
  }

  BASIC_MULTIPLICATION_LEVEL_ORDER.push(numberLevelOrder);
  levelFocusNumber++;
}
