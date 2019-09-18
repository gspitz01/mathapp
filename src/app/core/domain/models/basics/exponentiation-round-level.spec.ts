import { ExponentiationRoundLevel } from './exponentiation-round-level';
import { BasicOperatorQuestion } from './basic-operator-question';
import { EXPONENTIATION } from './basic-operators';

describe('ExponentiationRoundLevel', () => {
  const level = new ExponentiationRoundLevel('Whatever', 10, 2, 0, 10, 10);

  it('should create a question with the focus number as the second operand', () => {
    const question = level.createQuestion() as BasicOperatorQuestion;
    expect(question.operand2.value).toBe(level.focusNumber);
    expect(question.operand1.value >= level.lowerLimit && question.operand1.value <= level.upperLimit).toBeTruthy();
    expect(question.operator).toBe(EXPONENTIATION);
  });
});
