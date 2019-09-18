import { FractionOperatorQuestion } from './fraction-operator-question';
import { FractionResult } from './fraction-result';
import { FractionOperator } from './fraction-operator';
import { FractionResultLimitations } from './fraction-result-limitations';
import { FractionOperandLimitations } from './fraction-operand-limitations';
import { RoundLevel } from '../round-level';
import { OperatorQuestion } from '../operator-question';

export class FractionRoundLevel extends RoundLevel {

  constructor(name: string, operators: FractionOperator[],  questionThresholdPerSixtySeconds: number,
      readonly operand1Limitations: FractionOperandLimitations,
      readonly operand2Limitations: FractionOperandLimitations,
      readonly resultLimitations: FractionResultLimitations, totalSkips: number) {
        super(name, operators, questionThresholdPerSixtySeconds, totalSkips);
      }

  createQuestion(): OperatorQuestion {
    let question: FractionOperatorQuestion = null;
    let result: FractionResult;
    do {
      const op1 = this.operand1Limitations.createOperand();
      const op2 = this.operand2Limitations.createOperand();
      const operator = this.chooseOperator() as FractionOperator;
      question = new FractionOperatorQuestion(op1, op2, operator);
      result = question.getResult();
    } while (this.resultLimitations && !this.resultLimitations.resultSatisfiesLimitations(result));
    return question;
  }
}
