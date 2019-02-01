import { Operand } from "../operand";
import { BasicOperand } from "../basics/basic-operand";

export class FractionOperand implements Operand {
  constructor(readonly numerator: BasicOperand, readonly denominator: BasicOperand) {}
}
