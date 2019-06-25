import { BasicMultiplicationRoundLevel } from './basic-multiplication-round-level';
import { BasicOperatorQuestion } from './basic-operator-question';

describe('BasicMultiplicationRoundLevel', () => {
  it('should create BasicOperatorQuestion on createQuestion with correct focus factor', () => {
    const roundLevel = new BasicMultiplicationRoundLevel('Whatevers', 25, 2, 0, 10);
    const question = roundLevel.createQuestion() as BasicOperatorQuestion;
    const oneOperandIsTwo = (question.operand1.value === 2 || question.operand2.value === 2);
    expect(oneOperandIsTwo).toBeTruthy();
    expect(question.getResult().value % 2 === 0).toBeTruthy();
    expect(question.getResult().value <= 20).toBeTruthy();
  });

  it('should create questions with each possible factor', () => {
    const testFactorLimits = function(lowerLimit, upperLimit) {
      const factorLimitDifference = upperLimit - lowerLimit;
      const roundLevel = new BasicMultiplicationRoundLevel('Whatever', 25, 2, lowerLimit, upperLimit);
      const factorsSeen: number[] = [];
      for (let i = 0; i <= factorLimitDifference; i++) {
        const question = roundLevel.createQuestion() as BasicOperatorQuestion;
        let factor: number;
        if (question.operand1.value === 2) {
          factor = question.operand2.value;
        } else {
          factor = question.operand1.value;
        }
        expect(factorsSeen.includes(factor)).toBeFalsy();
        factorsSeen.push(factor);
      }
    };

    testFactorLimits(0, 10);
    testFactorLimits(10, 20);
  });
});
