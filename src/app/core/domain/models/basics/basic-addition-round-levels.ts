import { BasicOperator } from './basic-operator';
import { ADDITION } from './basic-operators';
import { BasicRoundLevel } from './basic-round-level';
import { BasicOperandLimitations } from './basic-operand-limitations';

const digitPhrases = [
  'single digit integers',
  '2 digit integers'
];
const levelNames: string[] = [];
for (let i = 0; i < 5; i++) {
  let levelName = `Level ${i + 1}: Adding ${digitPhrases[0]}`;
  if (i > 0) {
    levelName += ` and ${digitPhrases[1]} Part ${i}`;
  }
  levelNames.push(levelName);
}
const targets = [15, 15, 15, 15, 20];
const singleDigitBelowSix = new BasicOperandLimitations(true, 0, 6, false);
const singleDigitPositiveWholeNumbers = new BasicOperandLimitations(true, 0, 9, false);
const twoDigitBelowSixteen = new BasicOperandLimitations(true, 10, 16, false);
const twoDigitAboveFifteen = new BasicOperandLimitations(true, 16, 20, false);
const twoDigitBelowTwenty = new BasicOperandLimitations(true, 10, 20, false);
const limitations = [
  [singleDigitPositiveWholeNumbers, singleDigitPositiveWholeNumbers],
  [singleDigitPositiveWholeNumbers, twoDigitBelowSixteen],
  [singleDigitBelowSix, twoDigitAboveFifteen],
  [singleDigitPositiveWholeNumbers, twoDigitAboveFifteen],
  [singleDigitPositiveWholeNumbers, twoDigitBelowTwenty]
];

export const BASIC_ADDITION_LEVEL_ORDER: BasicRoundLevel[] = [];
for (let i = 0; i < levelNames.length; i++) {
  BASIC_ADDITION_LEVEL_ORDER.push(new BasicRoundLevel(levelNames[i], [ADDITION], targets[i],
    limitations[i][0], limitations[i][1], null, true, 10));
}
