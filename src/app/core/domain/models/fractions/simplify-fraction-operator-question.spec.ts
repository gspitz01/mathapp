import { FractionResult } from './fraction-result';
import { SimplifyFractionOperator } from './simplify-fraction-operator';
import { SimplifyFractionOperatorQuestion } from './simplify-fraction-operator-question';
import { BasicOperand } from '../basic-operand';
import { BasicResult } from '../basic-result';

describe('SimplifyFractionOperatorQuestion', () => {
  const num = new BasicOperand(45);
  const den = new BasicOperand(15);
  const expectedResult = new FractionResult(new BasicResult(3), new BasicResult(1));
  const fakeOp = function(num: BasicOperand, den: BasicOperand): FractionResult {
    return expectedResult;
  };
  const operator = new SimplifyFractionOperator("fake", fakeOp);
  const question = new SimplifyFractionOperatorQuestion(num, den, operator);

  it('getResult returns correct result', () => {
    expect(question.getResult()).toBe(expectedResult);
  });

  it('checkAnswer returns true if answer is correct', () => {
    let answer = expectedResult.numerator.value + "/" + expectedResult.denominator.value;
    expect(question.checkAnswer(answer)).toBeTruthy();
  });

  it('checkAnswer returns false if answer is incorrect', () => {
    let answer = (expectedResult.numerator.value + 1) + "/" + expectedResult.denominator.value;
    expect(question.checkAnswer(answer)).toBeFalsy();
  });

});
