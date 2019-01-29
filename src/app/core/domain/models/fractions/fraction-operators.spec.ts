import { FractionOperand } from "./fraction-operand";
import { FractionResult } from "./fraction-result";
import { FRACTION_MULTIPLICATION, FRACTION_DIVISION, FRACTION_ADDITION,
  FRACTION_SUBTRACTION } from './fraction-operators';
import { BasicOperand } from "../basic-operand";
import { BasicResult } from "../basic-result";

let op1 = new FractionOperand(new BasicOperand(3), new BasicOperand(4));
let op2 = new FractionOperand(new BasicOperand(5), new BasicOperand(6));
let zeroResult = new FractionResult(new BasicResult(0), new BasicResult(1));

describe('FRACTION_MULTIPLICATION', () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(new BasicResult(5), new BasicResult(8));
    let actualResult = FRACTION_MULTIPLICATION.operation(op1, op2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });

  it('answer should be 0/1 if the answer is 0', () => {
    let operand1 = new FractionOperand(new BasicOperand(0), new BasicOperand(4));
    let expectedResult = zeroResult;
    let actualResult = FRACTION_MULTIPLICATION.operation(operand1, op2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});

describe("FRACTION_DIVISION", () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(new BasicResult(9), new BasicResult(10));
    let actualResult = FRACTION_DIVISION.operation(op1, op2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});

describe('FRACTION_ADDITION', () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(new BasicResult(19), new BasicResult(12));
    let actualResult = FRACTION_ADDITION.operation(op1, op2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });

  it('answer should be 0/1 if the answer is 0', () => {
    let operand1 = new FractionOperand(new BasicOperand(0), new BasicOperand(4));
    let operand2 = new FractionOperand(new BasicOperand(0), new BasicOperand(6));
    let expectedResult = zeroResult;
    let actualResult = FRACTION_ADDITION.operation(operand1, operand2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});

describe('FRACTION_SUBTRACTION', () => {
  it('should return the correct answer', () => {
    let expectedResult = new FractionResult(new BasicResult(-1), new BasicResult(12));
    let actualResult = FRACTION_SUBTRACTION.operation(op1, op2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });

  it('answer should be 0/1 if the answer is 0', () => {
    let operand1 = new FractionOperand(new BasicOperand(10), new BasicOperand(12));
    let expectedResult = zeroResult;
    let actualResult = FRACTION_SUBTRACTION.operation(operand1, op2);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});
