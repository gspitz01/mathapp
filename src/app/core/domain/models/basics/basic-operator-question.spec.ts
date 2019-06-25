import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperator } from './basic-operator';
import { BasicOperand } from './basic-operand';

describe('BasicOperatorQuestion', () => {
  const op1 = new BasicOperand(4);
  const op2 = new BasicOperand(5);
  const expectedResult = 20;
  const fakeOp = function(operand1: number, operand2: number): number {
    return expectedResult;
  };
  const operator = new BasicOperator('fake', fakeOp);
  const question = new BasicOperatorQuestion(op1, op2, operator);

  it('should return correct result', () => {
    expect(question.getResult().value).toBe(expectedResult);
  });

  it('checkAnswer returns true if answer is correct', () => {
    expect(question.checkAnswer(expectedResult.toString())).toBeTruthy();
  });

  it('checkAnswer returns false if answer is incorrect', () => {
    expect(question.checkAnswer('34')).toBeFalsy();
  });
});
