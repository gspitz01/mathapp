import { DIVISION } from './basic-operators';
import { BasicFocusNumberedRoundLevel } from './basic-focus-numbered-round-level';

export class BasicDivisionRoundLevel extends BasicFocusNumberedRoundLevel {

  /**
   *
   * @param name The name of this level
   * @param questionThresholdPerSixtySeconds Number of questions to move on to next level with 60 second time limit
   * @param focusNumber The divisor
   * @param resultLowerLimit The lower limit for a result
   * @param resultUpperLimit The upper limit for a result
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, focusNumber: number, resultLowerLimit: number,
    resultUpperLimit: number) {
      super(name, [DIVISION], questionThresholdPerSixtySeconds, focusNumber, resultLowerLimit, resultUpperLimit, 10);
  }

  protected createOperand(): number {
    return (Math.floor(Math.random() * this.numberOfPossibleOperands) + this.lowerLimit) * this.focusNumber;
  }
}
