import { BasicFocusNumberedRoundLevel } from './basic-focus-numbered-round-level';
import { EXPONENTIATION } from './basic-operators';

export class ExponentiationRoundLevel extends BasicFocusNumberedRoundLevel {
  constructor(name: string, questionThresholdPerSixtySeconds: number, focusNumber: number, baseLowerLimit: number,
    baseUpperLImit: number, totalSkips: number) {
      super(name, [EXPONENTIATION], questionThresholdPerSixtySeconds, focusNumber, baseLowerLimit, baseUpperLImit, totalSkips);
    }

  protected createOperand(): number {
    return Math.floor(Math.random() * this.numberOfPossibleOperands) + this.lowerLimit;
  }
}
