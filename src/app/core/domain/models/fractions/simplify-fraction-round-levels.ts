import { SimplifyFractionRoundLevel } from './simplify-fraction-round-level';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';

const belowFive = new BasicOperandLimitations(true, 5, false, false);
const belowTen = new BasicOperandLimitations(true, 10, false, false);
const belowTwenty = new BasicOperandLimitations(true, 20, false, false);
const sfName = ' Simplify Fractions';
const EASY_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Easy' + sfName, 20, belowFive, belowFive, 5,
  null);
const MEDIUM_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Medium' + sfName, 16, belowFive, belowFive, 10, null);
const CHALLENGING_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Challenging' + sfName, 14, belowTen,
  belowTen, 10, null);
const HARD_SIMPLIFY_FRACTION = new SimplifyFractionRoundLevel('Hard' + sfName, 10, belowTen, belowTen, 20, null);
const EXPERT_SIMPLIFY_FRACITON = new SimplifyFractionRoundLevel('Expert' + sfName, 7, belowTwenty, belowTwenty, 20,
  null);

  export const SIMPLIFY_FRACTION_LEVEL_ORDER = [
    EASY_SIMPLIFY_FRACTION,
    MEDIUM_SIMPLIFY_FRACTION,
    CHALLENGING_SIMPLIFY_FRACTION,
    HARD_SIMPLIFY_FRACTION,
    EXPERT_SIMPLIFY_FRACITON
  ];
