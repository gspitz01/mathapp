import { BasicOperand } from "./basic-operand";

export class BasicOperandLimitations {
  constructor(readonly wholeNumber: boolean, readonly numberOfDigits: number, readonly possiblyNegative: boolean,
    readonly possiblyZero: boolean) {}

  createOperand(): BasicOperand {
    let value = Math.random() * 10**this.numberOfDigits;
    if (this.wholeNumber) {
      value = Math.floor(value);
    }
    if (this.possiblyNegative) {
      var multNeg = Math.random();
      if (multNeg > 0.5) {
        value = value * -1;
      }
    }
    return new BasicOperand(value);
  }
}
