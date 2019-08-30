import { BasicRoundLevel } from './basic-round-level';
import { BasicOperator } from './basic-operator';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { BasicResultLimitations } from './basic-result-limitations';
import { BasicOperatorQuestion } from './basic-operator-question';

describe('BasicRoundLevel', () => {
  it('should create BasicOperatorQuestion on createQuestion()', () => {
    const operation = function(op1: number, op2: number): number {
      return op1 + op2;
    };
    const operator = new BasicOperator('x', operation);
    const operators = [operator];
    const questionThreshold = 5;
    const op1Limitations = new BasicOperandLimitations(true, 1, 2, false);
    const op2Limitations = new BasicOperandLimitations(true, 0, 2, false);
    const resultLimitations = new BasicResultLimitations(true, false);
    const roundLevel = new BasicRoundLevel('Easy Whatever', operators, questionThreshold,
      op1Limitations, op2Limitations, resultLimitations);
    const question = roundLevel.createQuestion() as BasicOperatorQuestion;
    expect(question).toEqual(jasmine.any(BasicOperatorQuestion));
    expect(question.operand1.value).toBeLessThan(100);
    expect(question.operand2.value).toBeLessThan(100);
    expect(question.operator).toBe(operator);
  });
});
