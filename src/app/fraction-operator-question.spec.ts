import { FractionOperand } from './fraction-operand';
import { FractionResult } from "./fraction-result";
import { FractionOperator } from "./fraction-operator";
import { FractionOperatorQuestion } from "./fraction-operator-question";

describe('FractionOperatorQuestion', () => {
  it('getResult returns correct result', () => {
    let op1 = new FractionOperand(4, 5);
    let op2 = new FractionOperand(3, 4);
    let expectedResult = new FractionResult(4, 6);
    let fakeOp = function(operand1: FractionOperand, operand2: FractionOperand): FractionResult {
      return expectedResult;
    };
    let operator = new FractionOperator("fake", fakeOp);
    let question = new FractionOperatorQuestion(op1, op2, operator);
    expect(question.getResult()).toBe(expectedResult);
  });
});
