import { OperatorQuestion } from '../operator-question';
import { BasicOperand } from './basic-operand';
import { BasicOperator } from './basic-operator';
import { BasicResult } from './basic-result';

export class BasicOperatorQuestion implements OperatorQuestion {
  constructor(readonly operand1: BasicOperand, readonly operand2: BasicOperand, readonly operator: BasicOperator) {}

  getResult(): BasicResult {
    return new BasicResult(this.operator.operation(this.operand1.value, this.operand2.value));
  }

  checkAnswer(answer: string): boolean {
    return parseInt(answer, 10) === this.getResult().value;
  }
}
