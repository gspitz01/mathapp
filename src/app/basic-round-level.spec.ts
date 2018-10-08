import { BasicRoundLevel } from './basic-round-level';
import { BasicOperator } from './basic-operator';
import { OperandLimitations } from './operand-limitations';
import { ResultLimitations } from './result-limitations';
import { BasicOperatorQuestion } from './basic-operator-question';

describe("BasicRoundLevel", () => {
  it("should create BasicOperatorQuestion on createQuestion()", () => {
    let operation = function(op1: number, op2: number): number {
      return op1 + op2;
    };
    let operator = new BasicOperator("x", operation);
    let operators = [operator];
    let op1Limitations = new OperandLimitations(true, 2, false, false);
    let op2Limitations = new OperandLimitations(true, 2, false, true);
    let resultLimitations = new ResultLimitations(true, false);
    let roundLevel = new BasicRoundLevel("Easy Whatever", operators, op1Limitations, op2Limitations, resultLimitations);
    let question = roundLevel.createQuestion() as BasicOperatorQuestion;
    expect(question).toEqual(jasmine.any(BasicOperatorQuestion));
    expect(question.operand1).toBeLessThan(100);
    expect(question.operand2).toBeLessThan(100);
    expect(question.operator).toBe(operator);
  });
});
