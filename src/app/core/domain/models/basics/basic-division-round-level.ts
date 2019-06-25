import { DIVISION } from './basic-operators';
import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperator } from './basic-operator';
import { BasicOperand } from './basic-operand';
import { RoundLevel } from '../round-level';
import { OperatorQuestion } from '../operator-question';

export class BasicDivisionRoundLevel extends RoundLevel {

  private dividendsSeen: number[];
  private numberOfPossibleDividends: number;

  /**
   *
   * @param name The name of this level
   * @param questionThresholdPerSixtySeconds Number of questions to move on to next level with 60 second time limit
   * @param focusNumber The divisor
   * @param resultLowerLimit The lower limit for a result
   * @param resultUpperLimit The upper limit for a result
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, readonly focusNumber: number, readonly resultLowerLimit: number,
    readonly resultUpperLimit: number) {
      super(name, [DIVISION], questionThresholdPerSixtySeconds);
      this.dividendsSeen = [];
      this.numberOfPossibleDividends = resultUpperLimit - resultLowerLimit + 1;
  }

  createQuestion(): OperatorQuestion {
    let question: BasicOperatorQuestion = null;
    if (this.dividendsSeen.length === this.numberOfPossibleDividends) {
      this.dividendsSeen = [];
    }
    let dividend: number;
    do {
      dividend = this.createDividend();
    } while (this.dividendsSeen.includes(dividend));
    this.dividendsSeen.push(dividend);
    const operator = this.chooseOperator() as BasicOperator;
    const op1 = new BasicOperand(dividend);
    const op2 = new BasicOperand(this.focusNumber);
    question = new BasicOperatorQuestion(op1, op2, operator);
    return question;
  }

  private createDividend(): number {
    return (Math.floor(Math.random() * this.numberOfPossibleDividends) + this.resultLowerLimit) * this.focusNumber;
  }
}
