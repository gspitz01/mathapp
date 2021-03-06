import { RoundLevel } from '../round-level';
import { OperatorQuestion } from '../operator-question';
import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { BasicResult } from './basic-result';
import { BasicOperator } from './basic-operator';
import { BasicResultLimitations } from './basic-result-limitations';

export class BasicRoundLevel extends RoundLevel {

  constructor(name: string, operators: BasicOperator[],  questionThresholdPerSixtySeconds: number,
      readonly operand1Limitations: BasicOperandLimitations,
      readonly operand2Limitations: BasicOperandLimitations, readonly resultLimitations: BasicResultLimitations,
      readonly reversible: boolean, totalSkips: number) {
    super(name, operators, questionThresholdPerSixtySeconds, totalSkips);
  }

  createQuestion(): OperatorQuestion {
    let question: BasicOperatorQuestion = null;
    let result: BasicResult;
    do {
      let op1 = this.operand1Limitations.createOperand();
      let op2 = this.operand2Limitations.createOperand();
      const operator = this.chooseOperator() as BasicOperator;
      if (this.reversible) {
        if (Math.random() > 0.5) {
          const temp = op1;
          op1 = op2;
          op2 = temp;
        }
      }
      question = new BasicOperatorQuestion(op1, op2, operator);
      result = question.getResult();
    } while (this.resultLimitations && !this.resultSatisfiesLimitations(result));
    return question;
  }

  /**
   * Checks a question result to make sure it satisfies ResultLimitations
   * @param result The Result to be checked against
   */
  protected resultSatisfiesLimitations(result: BasicResult): boolean {
    return this.resultLimitations.resultSatisfiesLimitations(result);
  }
}
