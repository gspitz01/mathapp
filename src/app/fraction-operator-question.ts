import { FractionOperand } from "./fraction-operand";
import { FractionOperator } from "./fraction-operator";
import { FractionResult } from "./fraction-result";

export class FractionOperatorQuestion {
  constructor(readonly operand1: FractionOperand, readonly operand2: FractionOperand,
    readonly operator: FractionOperator) {
  }

  getResult(): FractionResult {
    return this.operator.operation(this.operand1, this.operand2);
  }
}
