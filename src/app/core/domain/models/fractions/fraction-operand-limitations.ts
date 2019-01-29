import { FractionOperand } from "./fraction-operand";
import { BasicOperandLimitations } from "../basic-operand-limitations";

export class FractionOperandLimitations {
  constructor(readonly numeratorLimitations: BasicOperandLimitations, readonly denominatorLimitations: BasicOperandLimitations) {}

  createOperand(): FractionOperand {
    return new FractionOperand(this.numeratorLimitations.createOperand(), this.denominatorLimitations.createOperand());
  }
}
