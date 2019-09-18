import { SimplifyFractionRoundLevel } from './simplify-fraction-round-level';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';

const belowFive = new BasicOperandLimitations(true, 1, 5, false);
const belowTen = new BasicOperandLimitations(true, 1, 10, false);
const belowTwenty = new BasicOperandLimitations(true, 1, 20, false);
const sfName = ' Simplify Fractions';
const EASY_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Easy' + sfName, 20, belowFive, belowFive, 5,
  null, 7);
const MEDIUM_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Medium' + sfName, 16, belowFive, belowFive, 10, null, 6);
const CHALLENGING_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Challenging' + sfName, 14, belowTen,
  belowTen, 10, null, 5);
const HARD_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Hard' + sfName, 10, belowTen, belowTen, 20, null, 4);
const EXPERT_SIMPLIFY_FRACITON = new SimplifyFractionRoundLevel('Expert' + sfName, 7, belowTwenty, belowTwenty, 20,
  null, 3);

  export const SIMPLIFY_FRACTION_LEVEL_ORDER = [
    EASY_SIMPLIFY_FRACTION,
    MEDIUM_SIMPLIFY_FRACTION,
    CHALLENGING_SIMPLIFY_FRACTION,
    HARD_SIMPLIFY_FRACTION,
    EXPERT_SIMPLIFY_FRACITON
  ];
