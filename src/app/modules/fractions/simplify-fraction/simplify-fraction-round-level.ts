import { RoundLevel } from "../../../shared/models/round-level";
import { OperatorQuestion } from "../../../shared/models/operator-question";
import { BasicOperandLimitations } from "../../../shared/models/basic-operand-limitations";
import { BasicOperand } from "../../../shared/models/basic-operand";
import { SimplifyFractionOperator } from "./simplify-fraction-operator";
import { FractionResultLimitations } from "../models/fraction-result-limitations";
import { FractionResult } from "../models/fraction-result";
import { SIMPLIFY_FRACTION } from "../models/fraction-operators";
import { SimplifyFractionOperatorQuestion } from "./simplify-fraction-operator-question";

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
