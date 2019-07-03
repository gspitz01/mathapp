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

  it('should return false on checkAnswer() if only 1 part of fraction', () => {
    const answer = '3';
    expect(question.checkAnswer(answer)).toBeFalsy();
  });

  it('should return false on checkAnswer() if more than 2 parts of a fraction', () => {
    const answer = '4/5/4';
    expect(question.checkAnswer(answer)).toBeFalsy();
  });

  it('should return true on checkAnswer() for any denominator if correct numerator is 0', () => {
    const op3 = new FractionOperand(new BasicOperand(0), new BasicOperand(5));
    const op4 = new FractionOperand(new BasicOperand(5), new BasicOperand(5));
    const expectedResult2 = new FractionResult(new BasicResult(0), new BasicResult(1));
    const fakeOp2 = function(operand1: FractionOperand, operand2: FractionOperand): FractionResult {
      return expectedResult2;
    };
    const operator2 = new FractionOperator('fake2', fakeOp2);
    const question2 = new FractionOperatorQuestion(op3, op4, operator2);
    for (let i = -5; i < 5; i++) {
      expect(question2.checkAnswer('0/' + i)).toBeTruthy();
    }
  });
});
