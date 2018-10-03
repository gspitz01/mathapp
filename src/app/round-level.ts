import { Operator } from "./operator";
import { Operand } from './operand';
import { OperandLimitations } from "./operand-limitations";
import { ResultLimitations } from './result-limitations';
import { BasicOperatorQuestion } from "./basic-operator-question";
import { Result } from './result';

export class RoundLevel {
  constructor(readonly name: string, readonly operators: Operator[],
    readonly operand1Limitations: OperandLimitations, readonly operand2Limitations: OperandLimitations,
    readonly resultLimitations: ResultLimitations) {}

  /**
   * Creates a BasicOperatorQuestion using the OperandLimitations from the level
   * Also checks that the result satisfies the ResultLimitations
   */
  createQuestion(): BasicOperatorQuestion {
    var question: BasicOperatorQuestion = null;
    var result: Result = null;
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
  private createOperand(limitations: OperandLimitations): Operand {
    var value = Math.random() * 10**limitations.numberOfDigits;
    if (limitations.wholeNumber) {
      value = Math.floor(value);
    }
    if (limitations.possiblyNegative) {
      var multNeg = Math.random();
      if (multNeg > 0.5) {
        value = value * -1;
      }
    }
    return new Operand(""+value, value);
  }

  /**
   * Checks a question result to make sure it satisfies ResultLimitations
   * @param result The Result to be checked against
   */
  private resultSatisfiesLimitations(result: Result): boolean {
    if (result === null) {
      return false;
    } else {
      if (this.resultLimitations === null) {
        return true;
      }
      if ((!this.resultLimitations.possiblyNegative && result.value < 0) ||
          (this.resultLimitations.wholeNumber && !Number.isInteger(result.value))) {
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
