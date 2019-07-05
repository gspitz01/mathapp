import { LcmRoundLevel } from './lcm-round-level';
import { BasicOperatorQuestion } from './basic-operator-question';
import { LCM } from './basic-operators';
import { BasicOperandLimitations } from './basic-operand-limitations';

describe('LcmRoundLevel', () => {
  const limits = new BasicOperandLimitations(true, 10, false, true);
  const level = new LcmRoundLevel('Whatever', 10, limits);

  it('should create a question within bounds on createQuestion()', () => {
    for (let i = 0; i < limits.absoluteLimit * 2; i++) {
      const question = level.createQuestion() as BasicOperatorQuestion;
      expect(question.operand1.value >= 0).toBeTruthy();
      expect(question.operand1.value <= limits.absoluteLimit).toBeTruthy();
      expect(question.operand2.value >= 0).toBeTruthy();
      expect(question.operand2.value <= limits.absoluteLimit).toBeTruthy();
      expect(question.operator).toBe(LCM);
    }
  });
});
