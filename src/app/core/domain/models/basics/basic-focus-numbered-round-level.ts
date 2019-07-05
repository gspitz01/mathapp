import { RoundLevel } from '../round-level';
import { OperatorQuestion } from '../operator-question';
import { Operator } from '../operator';
import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperator } from './basic-operator';
import { BasicOperand } from './basic-operand';

export abstract class BasicFocusNumberedRoundLevel extends RoundLevel {

  private operandsAlreadySeen: number[];
  protected numberOfPossibleOperands: number;

  /**
   * A RoundLevel which keeps one of the operands the same (the focus number),
   * and varies the other operand based on an upper and lower limit
   * Subclasses need to implement createOperand to create the other operand
   * @param name The level name
   * @param operators The possible operators to choose for questions
   * @param questionThresholdPerSixtySeconds The number of questions to answer in 60 seconds
   * @param focusNumber The operand number which will stay the same for each question
   * @param lowerLimit The intended lower limit for the other operand, should be used by subclasses' createOperand
   * @param upperLimit The intended upper limit for the other operand, can be used by createOperand,
   *           or is also used to calculate numberOfPossibleOperands which can also be used by createOperand
   */
  constructor(name: string, operators: Operator[], questionThresholdPerSixtySeconds: number,
    readonly focusNumber: number, readonly lowerLimit: number, readonly upperLimit: number) {
      super(name, operators, questionThresholdPerSixtySeconds);
      this.operandsAlreadySeen = [];
      this.numberOfPossibleOperands = upperLimit - lowerLimit + 1;
    }

  protected abstract createOperand(): number;

  createQuestion(): OperatorQuestion {
    let operand: number;
    if (this.operandsAlreadySeen.length === this.numberOfPossibleOperands) {
      this.operandsAlreadySeen = [];
    }
    do {
      operand = this.createOperand();
    } while (this.operandsAlreadySeen.includes(operand));
    this.operandsAlreadySeen.push(operand);
    const operator = this.chooseOperator() as BasicOperator;
    const op1 = new BasicOperand(operand);
    const op2 = new BasicOperand(this.focusNumber);
    return new BasicOperatorQuestion(op1, op2, operator);
  }
}
