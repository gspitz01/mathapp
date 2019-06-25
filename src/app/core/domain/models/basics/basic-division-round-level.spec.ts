import { BasicDivisionRoundLevel } from './basic-division-round-level';
import { BasicOperatorQuestion } from './basic-operator-question';
import { DIVISION } from './basic-operators';

describe('BasicDivisionRoundLevel', () => {
  it('should create BasicOperatorQuestion on createQuestion with correct focus number', () => {
    const focusNumber = 2;
    const resultLowerLimit = 0;
    const resultUpperLimit = 12;
    const level = new BasicDivisionRoundLevel('Whatever', 10, focusNumber, resultLowerLimit, resultUpperLimit);
    const question = level.createQuestion() as BasicOperatorQuestion;
    const result = question.getResult().value;
    expect(question.operator).toBe(DIVISION);
    expect(question.operand2.value).toBe(focusNumber);
    expect(result >= resultLowerLimit).toBeTruthy();
    expect(result <= resultUpperLimit).toBeTruthy();
    expect(result % 1 === 0).toBeTruthy();
  });

  it('should create questions with each possible result', () => {
    const testResultLimits = function(lowerLimit, upperLimit) {
      const focusNumber = 2;
      const resultLimitDifference = upperLimit - lowerLimit;
      const level = new BasicDivisionRoundLevel('Whatever', 10, focusNumber, lowerLimit, upperLimit);
      const resultsSeen: number[] = [];
      for (let i = 0; i <= resultLimitDifference; i++) {
        const question = level.createQuestion() as BasicOperatorQuestion;
        const result = question.getResult().value;
        expect(resultsSeen.includes(result)).toBeFalsy();
        resultsSeen.push(result);
      }
    };
    testResultLimits(0, 12);
    testResultLimits(10, 20);
  });

  it('should only show factors once until all factors have been seen', () => {
    const lowerLimit = 4;
    const upperLimit = 6;
    const focusNumber = 2;
    const roundLevel = new BasicDivisionRoundLevel('Whatever', 25, focusNumber, lowerLimit, upperLimit);
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
