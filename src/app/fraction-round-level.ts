import { RoundLevel } from "./round-level";
import { FractionOperatorQuestion } from "./fraction-operator-question";
import { FractionResult } from "./fraction-result";
import { OperatorQuestion } from "./operator-question";
import { FractionOperator } from "./fraction-operator";
import { FractionResultLimitations } from "./fraction-result-limitations";
import { FractionOperandLimitations } from "./fraction-operand-limitations";

export class FractionRoundLevel extends RoundLevel {

  constructor(name: string, operators: FractionOperator[], readonly operand1Limitations: FractionOperandLimitations,
      readonly operand2Limitations: FractionOperandLimitations, readonly resultLimitations: FractionResultLimitations) {
        super(name, operators);
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
