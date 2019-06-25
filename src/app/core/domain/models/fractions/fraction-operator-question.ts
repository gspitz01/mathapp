import { FractionOperand } from './fraction-operand';
import { FractionOperator } from './fraction-operator';
import { FractionResult } from './fraction-result';
import { OperatorQuestion } from '../operator-question';

export class FractionOperatorQuestion implements OperatorQuestion {
  constructor(readonly operand1: FractionOperand, readonly operand2: FractionOperand,
    readonly operator: FractionOperator) {
  }

  getResult(): FractionResult {
    return this.operator.operation(this.operand1, this.operand2);
  }

  checkAnswer(answer: string): boolean {
    if (answer.includes('/')) {
      const answers = answer.split('/');
      if (answers.length !== 2) {
        return false;
      }
      if (parseInt(answers[0], 10) === this.getResult().numerator.value &&
          parseInt(answers[1], 10) === this.getResult().denominator.value) {
        return true;
      }
    } else {
      return false;
    }
  }
}
