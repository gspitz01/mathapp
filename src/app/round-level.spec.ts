import { RoundLevel } from './round-level';
import { MULTIPLICATION } from './basic-operators';
import { OperandLimitations } from './operand-limitations';
import { ResultLimitations } from './result-limitations';
import { BasicOperatorQuestion } from './basic-operator-question';

describe('RoundLevel', () => {
  it('createQuestion should return a question', () => {
    let justMultiplication = [MULTIPLICATION];
    let op1Limitations = new OperandLimitations(true, 2, false);
    let op2Limitations = new OperandLimitations(true, 1, false);
    let resultLimitations = new ResultLimitations(true, false);
    let roundLevel = new RoundLevel(1, "Whatever", justMultiplication,
        op1Limitations, op2Limitations, resultLimitations);
    let question = roundLevel.createQuestion();
    expect(question).toEqual(jasmine.any(BasicOperatorQuestion));
    expect(question.operand1.value).toBeLessThan(100);
    expect(question.operand2.value).toBeLessThan(10);
    expect(question.operator).toBe(MULTIPLICATION);
  });
});
