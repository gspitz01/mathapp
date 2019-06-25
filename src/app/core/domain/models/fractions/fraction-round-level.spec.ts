import { FractionOperand } from './fraction-operand';
import { FractionResult } from './fraction-result';
import { FractionOperator } from './fraction-operator';
import { FractionOperandLimitations } from './fraction-operand-limitations';
import { FractionResultLimitations } from './fraction-result-limitations';
import { FractionRoundLevel } from './fraction-round-level';
import { FractionOperatorQuestion } from './fraction-operator-question';
import { BasicResult } from '../basics/basic-result';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';
import { BasicResultLimitations } from '../basics/basic-result-limitations';

describe('FractionRoundLevel', () => {
  it('should create FractionOperatorQuestion on createQuestion()', () => {
    const operation = function(op1: FractionOperand, op2: FractionOperand): FractionResult {
      return new FractionResult(new BasicResult(op1.numerator.value + op2.numerator.value),
        new BasicResult(op1.denominator.value * op2.denominator.value));
    };
    const operator = new FractionOperator('+', operation);
    const operators = [operator];
    const questionThreshold = 8;
    const op1NumLimitations = new BasicOperandLimitations(true, 2, false, true);
    const op1DenLimitations = new BasicOperandLimitations(true, 3, false, false);
    const op1Limitations = new FractionOperandLimitations(op1NumLimitations, op1DenLimitations);
    const op2NumLimitations = new BasicOperandLimitations(true, 2, false, true);
    const op2DenLimitations = new BasicOperandLimitations(true, 3, false, false);
    const op2Limitations = new FractionOperandLimitations(op2NumLimitations, op2DenLimitations);
    const resultNumLimitations = new BasicResultLimitations(true, false);
    const resultDenLimitations = new BasicResultLimitations(true, false);
    const resultLimitations = new FractionResultLimitations(resultNumLimitations, resultDenLimitations);
    const round = new FractionRoundLevel('Easy whatevs', operators, questionThreshold,
      op1Limitations, op2Limitations, resultLimitations);
    const question = round.createQuestion() as FractionOperatorQuestion;
    expect(question).toEqual(jasmine.any(FractionOperatorQuestion));
    expect(question.operand1.numerator.value).toBeLessThan(100);
    expect(question.operand1.denominator.value).toBeLessThan(1000);
    expect(question.operand2.numerator.value).toBeLessThan(100);
    expect(question.operand2.denominator.value).toBeLessThan(1000);
    expect(question.operator).toBe(operator);
  });
});
