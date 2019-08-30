import { BasicOperand } from './basic-operand';

export class BasicOperandLimitations {
  constructor(readonly wholeNumber: boolean, readonly lowerLimit: number, readonly upperLimit: number,
    readonly possiblyNegative: boolean) {}

  createOperand(): BasicOperand {
    let value: number;
    const difference = this.upperLimit - this.lowerLimit;
    value = Math.random() * difference + this.lowerLimit;
    if (this.wholeNumber) {
      value = Math.floor(value);
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
