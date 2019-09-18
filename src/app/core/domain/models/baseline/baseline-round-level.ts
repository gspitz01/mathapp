import { RoundLevel } from '../round-level';
import { OperatorQuestion } from '../operator-question';
import { ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, GCF, LCM, EXPONENTIATION } from '../basics/basic-operators';
import { COMBINATION_LEVEL_ORDER } from '../basics/combination-round-levels';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from '../basics/basic-multiplication-round-levels';
import { BASIC_DIVISION_LEVEL_ORDER } from '../basics/basic-division-round-levels';
import { GREATEST_COMMON_FACTOR_LEVEL_ORDER } from '../basics/gcf-round-levels';
import { LCM_LEVEL_ORDER } from '../basics/lcm-round-levels';
import { EXPONENTIATION_LEVEL_ORDER } from '../basics/exponentiation-round-levels';
import { Operator } from '../operator';

export class BaselineRoundLevel extends RoundLevel {
  private operatorWeights: number[];
  private operatorWeightSum: number;

  constructor(name: string, questionThresholdPerSixtySeconds: number, totalSkips: number) {
    // Need to have combination levels 1-4, mult times tables 3-9 with all integers possible,
    // div same as mult, Gcf two digit relatively non-prime, Lcm same as Gcf, Expo only squares
    super(name, [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, GCF,
      LCM, EXPONENTIATION], questionThresholdPerSixtySeconds, totalSkips);
    // Operator weights for how often they should arise
    this.operatorWeights = [0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.2];
    this.operatorWeightSum = this.operatorWeights.reduce((sum, current) => sum + current, 0);
  }

  createQuestion(): OperatorQuestion {
    const operator = this.chooseOperator();
    switch (operator) {
      case MULTIPLICATION:
        // For multiplication, choose a number 3-9 inclusive
        const mRound = Math.floor(Math.random() * 7) + 3;
        // Multiplication rounds start with index 0 as 2s
        // Use the easy level which is index 0
        return BASIC_MULTIPLICATION_LEVEL_ORDER[mRound - 2][0].createQuestion();
      case DIVISION:
        // For division, choose a number 3-9 inclusive
        const dRound = Math.floor(Math.random() * 7) + 3;
        // Division rounds start with index 0 as 2s
        // Use the easy level which is index 0
        return BASIC_DIVISION_LEVEL_ORDER[dRound - 2][0].createQuestion();
      case GCF:
        // Just get a question from level 1
        return GREATEST_COMMON_FACTOR_LEVEL_ORDER[0].createQuestion();
      case LCM:
        // Just get a question from level 1
        return LCM_LEVEL_ORDER[0].createQuestion();
      case EXPONENTIATION:
        // The 0th level of EXPONENTIATION is 2s
        // Use the medium level which is index 1
        return EXPONENTIATION_LEVEL_ORDER[0][1].createQuestion();
      case ADDITION:
      case SUBTRACTION:
      default:
        // For both addition and subtraction, just choose one of the combination levels
        const cRound = Math.floor(Math.random() * COMBINATION_LEVEL_ORDER.length);
        return COMBINATION_LEVEL_ORDER[cRound].createQuestion();
    }
  }

  protected chooseOperator(): Operator {
    if (this.operators.length === 0) {
      return null;
    }

    const randNum = Math.random() * this.operatorWeightSum;
    let sum = 0;
    let index = 0;
    while (randNum > sum) {
      sum += this.operatorWeights[index];
      index++;
    }
    return this.operators[index - 1];
  }
}
