import { Operand } from './operand';
import { Operator } from './operator';
import { Result } from './result';

export class BasicOperatorQuestion {
  constructor(readonly operand1: Operand, readonly operand2: Operand, readonly operator: Operator) {}

  getResult(): Result {
    return this.operator.operation(this.operand1, this.operand2);
  }
}
