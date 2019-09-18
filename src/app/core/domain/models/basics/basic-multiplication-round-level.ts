import { MULTIPLICATION } from './basic-operators';
import { BasicOperatorQuestion } from './basic-operator-question';
import { OperatorQuestion } from '../operator-question';
import { BasicFocusNumberedRoundLevel } from './basic-focus-numbered-round-level';

export class BasicMultiplicationRoundLevel extends BasicFocusNumberedRoundLevel {

  /**
   *
   * @param name The name of this level
   * @param questionThresholdPerSixtySeconds Number of questions to move onto next round with 60 second time limit
   * @param focusNumber One of the multiplicands will be this number
   * @param lowerFactorLimit The value of the lowest multiplicand other than the focus number allowed for this level
   * @param upperFactorLimit The value of the highest multiplicand other than the focus number allowed for this level
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, focusNumber: number, lowerFactorLimit: number,
    upperFactorLimit: number) {
    super(name, [MULTIPLICATION], questionThresholdPerSixtySeconds, focusNumber, lowerFactorLimit, upperFactorLimit, 10);
  }

  /**
   * @returns an OperatorQuestion where one mutliplicand is the focusNumber and the other is between 0 and factorLimit inclusive
   */
  createQuestion(): OperatorQuestion {
    let question = super.createQuestion() as BasicOperatorQuestion;
    if (Math.random() < 0.5) {
      return question;
    } else {
      return question = new BasicOperatorQuestion(question.operand2, question.operand1, question.operator);
    }
  }

  /**
   * @returns an integer between 0 and the factorLimit inclusive
   */
  protected createOperand(): number {
    return Math.floor(Math.random() * (this.numberOfPossibleOperands)) + this.lowerLimit;
  }
}
