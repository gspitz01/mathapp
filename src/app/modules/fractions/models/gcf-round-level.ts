import { GCF } from "../../../shared/models/basic-operators";
import { OperatorQuestion } from "../../../shared/models/operator-question";
import { BasicOperatorQuestion } from "../../../shared/models/basic-operator-question";
import { BasicOperator } from "../../../shared/models/basic-operator";
import { RoundLevel } from "src/app/shared/models/round-level";
import { BasicOperand } from "src/app/shared/models/basic-operand";
import { BasicOperandLimitations } from "src/app/shared/models/basic-operand-limitations";

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
