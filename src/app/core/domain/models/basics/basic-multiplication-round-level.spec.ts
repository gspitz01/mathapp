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

  it('should only show factors once until all factors have been seen', () => {
    const lowerLimit = 4;
    const upperLimit = 6;
    const focusNumber = 2;
    const roundLevel = new BasicMultiplicationRoundLevel('Whatever', 25, focusNumber, lowerLimit, upperLimit);
    const factorsSeen = [];

    for (let i = lowerLimit; i <= upperLimit; i++) {
      const question = roundLevel.createQuestion() as BasicOperatorQuestion;
      if (question.operand1.value === focusNumber) {
        expect(factorsSeen.includes(question.operand2.value)).toBeFalsy();
        factorsSeen.push(question.operand2.value);
      } else if (question.operand2.value === focusNumber) {
        expect(factorsSeen.includes(question.operand1.value)).toBeFalsy();
        factorsSeen.push(question.operand1.value);
      } else {
        console.log('should not be here');
      }
    }
    const newQuestion = roundLevel.createQuestion() as BasicOperatorQuestion;
    if (newQuestion.operand1.value === focusNumber) {
      expect(factorsSeen.includes(newQuestion.operand2.value)).toBeTruthy();
    } else if (newQuestion.operand2.value === focusNumber) {
      expect(factorsSeen.includes(newQuestion.operand1.value)).toBeTruthy();
    } else {
      console.log('should not be here as well');
    }
  });
});
