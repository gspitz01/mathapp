import { BasicRoundLevel } from './basic-round-level';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { ADDITION, SUBTRACTION } from './basic-operators';

const positiveLessThanTen = new BasicOperandLimitations(true, 10, false, true);
const maybeNegativeLessThanTen = new BasicOperandLimitations(true, 10, true, true);
export const COMBINATION_LEVEL_ORDER = [
  new BasicRoundLevel('Easy Combination', [ADDITION], 20, positiveLessThanTen, positiveLessThanTen, null),
  new BasicRoundLevel('Medium Combination', [ADDITION], 20, maybeNegativeLessThanTen, maybeNegativeLessThanTen, null),
  new BasicRoundLevel('Hard Combination', [ADDITION, SUBTRACTION], 20, positiveLessThanTen, positiveLessThanTen, null),
  new BasicRoundLevel('Expert Combination', [ADDITION, SUBTRACTION], 20,
      maybeNegativeLessThanTen, maybeNegativeLessThanTen, null)
];
