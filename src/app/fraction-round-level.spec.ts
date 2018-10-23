import { FractionOperand } from "./fraction-operand";
import { FractionResult } from "./fraction-result";
import { BasicResult } from "./basic-result";
import { BasicOperand } from "./basic-operand";
import { FractionOperator } from "./fraction-operator";
import { FractionOperandLimitations } from "./fraction-operand-limitations";
import { BasicOperandLimitations } from "./basic-operand-limitations";
import { FractionResultLimitations } from "./fraction-result-limitations";
import { BasicResultLimitations } from "./basic-result-limitations";
import { FractionRoundLevel } from "./fraction-round-level";
import { FractionOperatorQuestion } from "./fraction-operator-question";

describe("FractionRoundLevel", () => {
  it('should create FractionOperatorQuestion on createQuestion()', () => {
    let operation = function(op1: FractionOperand, op2: FractionOperand): FractionResult {
      return new FractionResult(new BasicResult(op1.numerator.value + op2.numerator.value),
        new BasicResult(op1.denominator.value * op2.denominator.value));
    }
    let operator = new FractionOperator("+", operation);
    let operators = [operator];
    let questionThreshold = 8;
    let op1NumLimitations = new BasicOperandLimitations(true, 2, false, true);
    let op1DenLimitations = new BasicOperandLimitations(true, 3, false, false);
    let op1Limitations = new FractionOperandLimitations(op1NumLimitations, op1DenLimitations);
    let op2NumLimitations = new BasicOperandLimitations(true, 2, false, true);
    let op2DenLimitations = new BasicOperandLimitations(true, 3, false, false);
    let op2Limitations = new FractionOperandLimitations(op2NumLimitations, op2DenLimitations);
    let resultNumLimitations = new BasicResultLimitations(true, false);
    let resultDenLimitations = new BasicResultLimitations(true, false);
    let resultLimitations = new FractionResultLimitations(resultNumLimitations, resultDenLimitations);
    let round = new FractionRoundLevel("Easy whatevs", operators, questionThreshold,
      op1Limitations, op2Limitations, resultLimitations);
    let question = round.createQuestion() as FractionOperatorQuestion;
    expect(question).toEqual(jasmine.any(FractionOperatorQuestion));
    expect(question.operand1.numerator.value).toBeLessThan(100);
    expect(question.operand1.denominator.value).toBeLessThan(1000);
    expect(question.operand2.numerator.value).toBeLessThan(100);
    expect(question.operand2.denominator.value).toBeLessThan(1000);
    expect(question.operator).toBe(operator);
  });
});
