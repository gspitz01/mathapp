import { RoundLevel } from "./round-level";
import { MULTIPLICATION } from "./basic-operators";
import { BasicOperatorQuestion } from "./basic-operator-question";
import { OperatorQuestion } from "./operator-question";
import { BasicOperand } from "./basic-operand";
import { BasicOperator } from "./basic-operator";

export class BasicMultiplicationRoundLevel extends RoundLevel {

  private factorsAlreadySeen: number[];
  private numberOfPossibleFactors;

  /**
   *
   * @param name The name of this level
   * @param questionThresholdPerSixtySeconds Number of questions to move onto next round with 60 second time limit
   * @param focusNumber One of the multiplicands will be this number
   * @param lowerFactorLimit The value of the lowest multiplicand other than the focus number allowed for this level
   * @param upperFactorLimit The value of the highest multiplicand other than the focus number allowed for this level
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, readonly focusNumber: number, readonly lowerFactorLimit: number,
    readonly upperFactorLimit: number) {
    super(name, [MULTIPLICATION], questionThresholdPerSixtySeconds);
    this.factorsAlreadySeen = [];
    this.numberOfPossibleFactors = upperFactorLimit - lowerFactorLimit + 1;
  }

  /**
   * @returns an OperatorQuestion where one mutliplicand is the focusNumber and the other is between 0 and factorLimit inclusive
   */
  createQuestion(): OperatorQuestion {
    let question: BasicOperatorQuestion = null;
    let factor: number;
    if (this.factorsAlreadySeen.length == this.numberOfPossibleFactors) {
      this.factorsAlreadySeen = [];
    }
    do {
      factor = this.createRandomFactor();
    } while(this.factorsAlreadySeen.includes(factor));
    this.factorsAlreadySeen.push(factor);
    let operator = this.chooseOperator() as BasicOperator;
    let op1 = new BasicOperand(this.focusNumber);
    let op2 = new BasicOperand(factor);
    if (Math.random() < 0.5) {
      question = new BasicOperatorQuestion(op1, op2, operator);
    } else {
      question = new BasicOperatorQuestion(op2, op1, operator);
    }
    return question;
  }

  /**
   * @returns an integer between 0 and the factorLimit inclusive
   */
  private createRandomFactor(): number {
    return Math.floor(Math.random() * (this.numberOfPossibleFactors)) + this.lowerFactorLimit;
  }
}
