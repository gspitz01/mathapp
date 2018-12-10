import { RoundLevel } from "../round-level";
import { SimplifyFractionOperatorQuestion } from "./simplify-fraction-operator-question";
import { OperatorQuestion } from "../operator-question";
import { SimplifyFractionOperator } from "./simplify-fraction-operator";
import { BasicOperandLimitations } from "../basic-operand-limitations";
import { FractionResultLimitations } from "../fraction-result-limitations";
import { FractionResult } from "../fraction-result";
import { SIMPLIFY_FRACTION } from "../fraction-operators";
import { BasicOperand } from "../basic-operand";

export class SimplifyFractionRoundLevel extends RoundLevel {

  constructor(name: string, questionThresholdPerSixtySeconds,
    readonly numeratorLimitations: BasicOperandLimitations, readonly denominatorLimitations: BasicOperandLimitations,
    readonly gcfLimit: number, readonly resultLimitations: FractionResultLimitations) {
      super(name, [SIMPLIFY_FRACTION], questionThresholdPerSixtySeconds);
  }

  createQuestion(): OperatorQuestion {
    let question: SimplifyFractionOperatorQuestion = null;
    let result: FractionResult;
    do {
      let gcfMultiplier = Math.floor(Math.random() * this.gcfLimit) + 2;
      let num = new BasicOperand(this.numeratorLimitations.createOperand().value * gcfMultiplier);
      let den = new BasicOperand(this.denominatorLimitations.createOperand().value * gcfMultiplier);
      let operator = this.chooseOperator() as SimplifyFractionOperator;
      question = new SimplifyFractionOperatorQuestion(num, den, operator);
      result = question.getResult();
    } while (this.resultLimitations && !this.resultLimitations.resultSatisfiesLimitations(result));
    return question;
  }
}
