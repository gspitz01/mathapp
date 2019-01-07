import { RoundLevel } from "../../../shared/models/round-level";
import { OperatorQuestion } from "../../../shared/models/operator-question";
import { FractionOperatorQuestion } from "./fraction-operator-question";
import { FractionResult } from "./fraction-result";
import { FractionOperator } from "./fraction-operator";
import { FractionResultLimitations } from "./fraction-result-limitations";
import { FractionOperandLimitations } from "./fraction-operand-limitations";

export class FractionRoundLevel extends RoundLevel {

  constructor(name: string, operators: FractionOperator[],  questionThresholdPerSixtySeconds: number,
      readonly operand1Limitations: FractionOperandLimitations,
      readonly operand2Limitations: FractionOperandLimitations, readonly resultLimitations: FractionResultLimitations) {
        super(name, operators, questionThresholdPerSixtySeconds);
      }

  createQuestion(): OperatorQuestion {
    let question: FractionOperatorQuestion = null;
    let result: FractionResult;
    do {
      let op1 = this.operand1Limitations.createOperand();
      let op2 = this.operand2Limitations.createOperand();
      let operator = this.chooseOperator() as FractionOperator;
      question = new FractionOperatorQuestion(op1, op2, operator);
      result = question.getResult();
    } while(this.resultLimitations && !this.resultLimitations.resultSatisfiesLimitations(result));
    return question;
  }
}
