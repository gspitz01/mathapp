import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperator } from './basic-operator';

describe('BasicOperatorQuestion', () => {
  it('should return correct result', () => {
    let op1 = 4;
    let op2 = 5;
    let expectedResult = 20;
    let fakeOp = function(operand1: number, operand2: number): number {
      return expectedResult;
    }
    let operator = new BasicOperator("fake", fakeOp);
    let question = new BasicOperatorQuestion(op1, op2, operator);
    expect(question.getResult()).toBe(expectedResult);
  });
});
