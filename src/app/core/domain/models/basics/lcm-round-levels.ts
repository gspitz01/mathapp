import { BasicOperandLimitations } from './basic-operand-limitations';
import { LcmRoundLevel } from './lcm-round-level';

export const LCM_LEVEL_ORDER = [];

const thresholds = [15, 12, 10, 8, 5];
const limits = [10, 15, 20, 25, 30];
const difficultyNames = ['Easy', 'Medium', 'Challenging', 'Hard', 'Expert'];
for (let i = 0; i < difficultyNames.length; i++) {
  LCM_LEVEL_ORDER.push(new LcmRoundLevel(difficultyNames[i] + ' Least Common Multiple',
    thresholds[i], new BasicOperandLimitations(true, limits[i], false, true)));
}
