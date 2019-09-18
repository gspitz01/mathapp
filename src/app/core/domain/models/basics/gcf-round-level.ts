import { RoundLevel } from '../round-level';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { GCF } from './basic-operators';
import { OperatorQuestion } from '../operator-question';
import { BasicOperand } from './basic-operand';
import { BasicOperator } from './basic-operator';
import { BasicOperatorQuestion } from './basic-operator-question';


export class GcfRoundLevel extends RoundLevel {

  /**
   *
   * @param name The name of this round
   * @param questionThresholdPerSixtySeconds How many questions to get right in 60 seconds to move to next level
   * @param baseNumberLimit Limit for the number on which to base each operand
   * @param multiplierLimit Limit for the number by which to multiply each operand
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, readonly baseNumberLimit: BasicOperandLimitations,
    readonly multiplierLimit: BasicOperandLimitations, totalSkips: number) {

    super(name, [GCF], questionThresholdPerSixtySeconds, totalSkips);
  }

  createQuestion(): OperatorQuestion {
    const baseNumber = this.baseNumberLimit.createOperand().value;
    let multiplier = this.multiplierLimit.createOperand().value;
    const op1 = new BasicOperand(baseNumber * multiplier);
    multiplier = this.multiplierLimit.createOperand().value;
    const op2 = new BasicOperand(baseNumber * multiplier);
    const operator = this.chooseOperator() as BasicOperator;
    return new BasicOperatorQuestion(op1, op2, operator);
  }
}
