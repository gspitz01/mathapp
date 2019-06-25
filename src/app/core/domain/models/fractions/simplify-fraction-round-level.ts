import { SimplifyFractionOperator } from './simplify-fraction-operator';
import { FractionResultLimitations } from './fraction-result-limitations';
import { FractionResult } from './fraction-result';
import { SIMPLIFY_FRACTION } from './fraction-operators';
import { SimplifyFractionOperatorQuestion } from './simplify-fraction-operator-question';
import { RoundLevel } from '../round-level';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';
import { OperatorQuestion } from '../operator-question';
import { BasicOperand } from '../basics/basic-operand';

export class SimplifyFractionRoundLevel extends RoundLevel {

  constructor(name: string, questionThresholdPerSixtySeconds,
    readonly numeratorLimitations: BasicOperandLimitations, readonly denominatorLimitations: BasicOperandLimitations,
    readonly gcfLimit: number, readonly resultLimitations: FractionResultLimitations) {
      super(name, [SIMPLIFY_FRACTION], questionThresholdPerSixtySeconds);
  }

  createQuestion(): OperatorQuestion {
    let question: SimplifyFractionOperatorQuestion = null;
    let result: FractionResult;
    do {
      const gcfMultiplier = Math.floor(Math.random() * this.gcfLimit) + 2;
      const num = new BasicOperand(this.numeratorLimitations.createOperand().value * gcfMultiplier);
      const den = new BasicOperand(this.denominatorLimitations.createOperand().value * gcfMultiplier);
      const operator = this.chooseOperator() as SimplifyFractionOperator;
      question = new SimplifyFractionOperatorQuestion(num, den, operator);
      result = question.getResult();
    } while (this.resultLimitations && !this.resultLimitations.resultSatisfiesLimitations(result));
    return question;
  }
}
