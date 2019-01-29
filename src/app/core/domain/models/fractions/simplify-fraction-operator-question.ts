import { SimplifyFractionOperator } from "./simplify-fraction-operator";
import { FractionResult } from "./fraction-result";
import { BasicOperand } from "../basic-operand";
import { OperatorQuestion } from "../operator-question";

export class SimplifyFractionOperatorQuestion implements OperatorQuestion {
  constructor(readonly numerator: BasicOperand, readonly denominator: BasicOperand,
    readonly operator: SimplifyFractionOperator) {}

  getResult(): FractionResult {
    return this.operator.operation(this.numerator, this.denominator);
  }

  checkAnswer(answer: string): boolean {
    if (answer.includes("/")) {
      let answers = answer.split("/");
      if (answers.length != 2) {
        return false;
      }
      if (parseInt(answers[0], 10) === this.getResult().numerator.value &&
          parseInt(answers[1], 10) === this.getResult().denominator.value) {
        return true;
      }
    } else {
      return false;
    }
  }
}
