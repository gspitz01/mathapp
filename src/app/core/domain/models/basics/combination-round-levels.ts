import { BasicRoundLevel } from './basic-round-level';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { ADDITION, SUBTRACTION } from './basic-operators';

const positiveLessThanTen = new BasicOperandLimitations(true, 0, 10, false);
const maybeNegativeLessThanTen = new BasicOperandLimitations(true, 0, 10, true);
export const COMBINATION_LEVEL_ORDER = [
  new BasicRoundLevel('Easy Combination', [ADDITION], 20, positiveLessThanTen, positiveLessThanTen, null, true, 6),
  new BasicRoundLevel('Medium Combination', [ADDITION], 20, maybeNegativeLessThanTen, maybeNegativeLessThanTen, null, true, 5),
  new BasicRoundLevel('Hard Combination', [ADDITION, SUBTRACTION], 20, positiveLessThanTen, positiveLessThanTen, null, true, 4),
  new BasicRoundLevel('Expert Combination', [ADDITION, SUBTRACTION], 20,
      maybeNegativeLessThanTen, maybeNegativeLessThanTen, null, true, 3)
];
