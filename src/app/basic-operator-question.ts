import { Operator } from './operator';

export class BasicOperatorQuestion {
  constructor(readonly operand1: number, readonly operand2: number, readonly operator: Operator) {}

  getResult(): number {
    return this.operator.operation(this.operand1, this.operand2);
  }
}
