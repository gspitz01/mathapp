import { RoundLevel } from '../round-level';
import { LCM } from './basic-operators';
import { OperatorQuestion } from '../operator-question';
import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperand } from './basic-operand';
import { BasicOperator } from './basic-operator';
import { BasicOperandLimitations } from './basic-operand-limitations';

export class LcmRoundLevel extends RoundLevel {
  constructor(name: string, questionThresholdPerSixtySeconds: number, readonly operandLimits: BasicOperandLimitations,
    totalSkips: number) {
      super(name, [LCM], questionThresholdPerSixtySeconds, totalSkips);
    }

  createQuestion(): OperatorQuestion {
    return new BasicOperatorQuestion(this.operandLimits.createOperand(),
      this.operandLimits.createOperand(), this.chooseOperator() as BasicOperator);
  }
}
