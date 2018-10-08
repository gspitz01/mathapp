import { BasicOperatorQuestion } from './basic-operator-question';
import { BasicOperator } from './basic-operator';
import { BasicOperand } from './basic-operand';

describe('BasicOperatorQuestion', () => {
  it('should return correct result', () => {
    let op1 = new BasicOperand(4);
    let op2 = new BasicOperand(5);
    let expectedResult = 20;
    let fakeOp = function(operand1: number, operand2: number): number {
      return expectedResult;
    }
    let operator = new BasicOperator("fake", fakeOp);
    let question = new BasicOperatorQuestion(op1, op2, operator);
    expect(question.getResult().value).toBe(expectedResult);
  });
});
