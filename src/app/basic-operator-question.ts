import { Operator } from './operator';
import { OperatorQuestion } from './operator-question';

export class BasicOperatorQuestion implements OperatorQuestion {
  constructor(readonly operand1: number, readonly operand2: number, readonly operator: Operator) {}

  getResult(): number {
    return this.operator.operation(this.operand1, this.operand2);
  }

  checkAnswer(answer: string): boolean {
    return parseInt(answer, 10) === this.getResult();
  }
}
