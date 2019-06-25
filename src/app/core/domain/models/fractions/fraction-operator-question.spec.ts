import { FractionOperand } from './fraction-operand';
import { BasicOperand } from '../basics/basic-operand';
import { FractionResult } from './fraction-result';
import { BasicResult } from '../basics/basic-result';
import { FractionOperator } from './fraction-operator';
import { FractionOperatorQuestion } from './fraction-operator-question';

describe('FractionOperatorQuestion', () => {
  const op1 = new FractionOperand(new BasicOperand(4), new BasicOperand(5));
  const op2 = new FractionOperand(new BasicOperand(3), new BasicOperand(4));
  const expectedResult = new FractionResult(new BasicResult(4), new BasicResult(6));
  const fakeOp = function(operand1: FractionOperand, operand2: FractionOperand): FractionResult {
    return expectedResult;
  };
  const operator = new FractionOperator('fake', fakeOp);
  const question = new FractionOperatorQuestion(op1, op2, operator);

  it('getResult returns correct result', () => {
    expect(question.getResult()).toBe(expectedResult);
  });

  it('checkAnswer returns true if answer is correct', () => {
    const answer = expectedResult.numerator.value + '/' + expectedResult.denominator.value;
    expect(question.checkAnswer(answer)).toBeTruthy();
  });

  it('checkAnswer return false if answer is incorrect', () => {
    const answer = (expectedResult.numerator.value + 1) + '/' + expectedResult.denominator.value;
    expect(question.checkAnswer(answer)).toBeFalsy();
  });
});
