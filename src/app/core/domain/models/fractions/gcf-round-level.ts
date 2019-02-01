import { RoundLevel } from "../round-level";
import { BasicOperandLimitations } from "../basics/basic-operand-limitations";
import { GCF } from "../basics/basic-operators";
import { OperatorQuestion } from "../operator-question";
import { BasicOperand } from "../basics/basic-operand";
import { BasicOperator } from "../basics/basic-operator";
import { BasicOperatorQuestion } from "../basics/basic-operator-question";


export class GcfRoundLevel extends RoundLevel {

  /**
   *
   * @param name The name of this round
   * @param questionThresholdPerSixtySeconds How many questions to get right in 60 seconds to move to next level
   * @param baseNumberLimit Limit for the number on which to base each operand
   * @param multiplierLimit Limit for the number by which to multiply each operand
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, readonly baseNumberLimit: BasicOperandLimitations,
    readonly multiplierLimit: BasicOperandLimitations) {

    super(name, [GCF], questionThresholdPerSixtySeconds);
  }

  createQuestion(): OperatorQuestion {
    let baseNumber = this.baseNumberLimit.createOperand().value;
    let multiplier = this.multiplierLimit.createOperand().value;
    let op1 = new BasicOperand(baseNumber * multiplier);
    multiplier = this.multiplierLimit.createOperand().value;
    let op2 = new BasicOperand(baseNumber * multiplier);
    let operator = this.chooseOperator() as BasicOperator;
    return new BasicOperatorQuestion(op1, op2, operator);
  }
}
