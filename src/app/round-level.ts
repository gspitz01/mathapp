import { Operator } from "./operator";
import { OperandLimitations } from "./operand-limitations";
import { ResultLimitations } from './result-limitations';
import { OperatorQuestion } from "./operator-question";

export abstract class RoundLevel {
  constructor(readonly name: string, readonly operators: Operator[],
    readonly operand1Limitations: OperandLimitations, readonly operand2Limitations: OperandLimitations,
    readonly resultLimitations: ResultLimitations) {}

  /**
   * Creates a BasicOperatorQuestion using the OperandLimitations from the level
   * Also checks that the result satisfies the ResultLimitations
   */
  abstract createQuestion(): OperatorQuestion;

  /**
   * Creates an operand for the question to be asked
   * @param limitations The limitations for the Operand to be created
   */
  protected createOperand(limitations: OperandLimitations): number {
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
  protected resultSatisfiesLimitations(result: number): boolean {
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
  protected chooseOperator(): Operator {
    let choice = Math.floor(Math.random() * this.operators.length);
    return this.operators[choice];
  }
}
