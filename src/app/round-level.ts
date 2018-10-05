import { Operator } from "./operator";
import { OperandLimitations } from "./operand-limitations";
import { ResultLimitations } from './result-limitations';
import { BasicOperatorQuestion } from "./basic-operator-question";

export class RoundLevel {
  constructor(readonly name: string, readonly operators: Operator[],
    readonly operand1Limitations: OperandLimitations, readonly operand2Limitations: OperandLimitations,
    readonly resultLimitations: ResultLimitations) {}

  /**
   * Creates a BasicOperatorQuestion using the OperandLimitations from the level
   * Also checks that the result satisfies the ResultLimitations
   */
  createQuestion(): BasicOperatorQuestion {
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

  /**
   * Creates an operand for the question to be asked
   * @param limitations The limitations for the Operand to be created
   */
  private createOperand(limitations: OperandLimitations): number {
    let value = Math.random() * 10**limitations.numberOfDigits;
    if (limitations.wholeNumber) {
      value = Math.floor(value);
    }
    if (limitations.possiblyNegative) {
      var multNeg = Math.random();
      if (multNeg > 0.5) {
        value = value * -1;
      }
    }
    return value;
  }

  /**
   * Checks a question result to make sure it satisfies ResultLimitations
   * @param result The Result to be checked against
   */
  private resultSatisfiesLimitations(result: number): boolean {
    if (result === null) {
      return false;
    } else {
      if (this.resultLimitations === null) {
        return true;
      }
      if ((!this.resultLimitations.possiblyNegative && result < 0) ||
          (this.resultLimitations.wholeNumber && !Number.isInteger(result))) {
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * Chooses an Operator from the options in the level
   */
  private chooseOperator(): Operator {
    let choice = Math.floor(Math.random() * this.operators.length);
    return this.operators[choice];
  }
}
