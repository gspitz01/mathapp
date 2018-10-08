import { RoundLevel } from "./round-level";
import { OperatorQuestion } from "./operator-question";
import { BasicOperatorQuestion } from './basic-operator-question';

export class BasicRoundLevel extends RoundLevel {

  createQuestion(): OperatorQuestion {
    let question: BasicOperatorQuestion = null;
    let result: number
    do {
      let op1 = this.createOperand(this.operand1Limitations);
      let op2 = this.createOperand(this.operand2Limitations);
      let operator = this.chooseOperator();
      question = new BasicOperatorQuestion(op1, op2, operator);
      result = question.getResult();
    } while (!this.resultSatisfiesLimitations(result));
    return question;
  }
}
