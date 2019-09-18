import { LcmRoundLevel } from './lcm-round-level';
import { BasicOperatorQuestion } from './basic-operator-question';
import { LCM } from './basic-operators';
import { BasicOperandLimitations } from './basic-operand-limitations';

describe('LcmRoundLevel', () => {
  const limits = new BasicOperandLimitations(true, 0, 10, false);
  const level = new LcmRoundLevel('Whatever', 10, limits, 10);

  it('should create a question within bounds on createQuestion()', () => {
    for (let i = 0; i < limits.upperLimit * 2; i++) {
      const question = level.createQuestion() as BasicOperatorQuestion;
      expect(question.operand1.value >= limits.lowerLimit).toBeTruthy();
      expect(question.operand1.value <= limits.upperLimit).toBeTruthy();
      expect(question.operand2.value >= limits.lowerLimit).toBeTruthy();
      expect(question.operand2.value <= limits.upperLimit).toBeTruthy();
      expect(question.operator).toBe(LCM);
    }
  });
});
