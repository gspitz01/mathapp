import { BasicOperatorQuestion } from './basic-operator-question';
import { Operand } from './operand';
import { Result } from './result';
import { Operator } from './operator';

describe('BasicOperatorQuestion', () => {
  it('should return correct result', () => {
    let op1 = new Operand("4", 4);
    let op2 = new Operand("5", 5);
    let expectedResult = new Result("20", 20);
    let fakeOp = function(operand1: Operand, operand2: Operand): Result {
      return expectedResult;
    }
    let operator = new Operator("fake", fakeOp);
    let question = new BasicOperatorQuestion(op1, op2, operator);
    expect(question.getResult()).toBe(expectedResult);
  });
});
