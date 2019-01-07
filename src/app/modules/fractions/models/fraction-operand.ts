import { Operand } from "../../../shared/models/operand";
import { BasicOperand } from "../../../shared/models/basic-operand";

export class FractionOperand implements Operand {
  constructor(readonly numerator: BasicOperand, readonly denominator: BasicOperand) {}
}
