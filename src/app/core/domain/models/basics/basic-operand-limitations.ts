import { BasicOperand } from './basic-operand';

export class BasicOperandLimitations {
  constructor(readonly wholeNumber: boolean, readonly absoluteLimit: number, readonly possiblyNegative: boolean,
    readonly possiblyZero: boolean) {}

  createOperand(): BasicOperand {
    let value: number;
    value = Math.random() * this.absoluteLimit;
    if (this.wholeNumber) {
      value = Math.floor(value);
      if (!this.possiblyZero && value === 0) {
        value = 1;
      }
    } else {
      if (!this.possiblyZero && value === 0.0) {
        value = 0.1;
      }
    }
    if (this.possiblyNegative) {
      const multNeg = Math.random();
      if (multNeg > 0.5) {
        value = value * -1;
      }
    }
    return new BasicOperand(value);
  }
}
