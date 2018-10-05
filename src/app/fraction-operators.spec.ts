import { FractionOperand } from "./fraction-operand";
import { FractionResult } from "./fraction-result";
import { FRACTION_MULTIPLICATION, FRACTION_DIVISION, FRACTION_ADDITION, FRACTION_SUBTRACTION } from './fraction-operators';

let op1 = new FractionOperand(3, 4);
let op2 = new FractionOperand(5, 6);

describe('FRACTION_MULTIPLICATION', () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(5, 8);
    let actualResult = FRACTION_MULTIPLICATION.operation(op1, op2);
    expect(actualResult.numerator).toBe(expectedResult.numerator);
    expect(actualResult.denominator).toBe(expectedResult.denominator);
  });
});

describe("FRACTION_DIVISION", () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(9, 10);
    let actualResult = FRACTION_DIVISION.operation(op1, op2);
    expect(actualResult.numerator).toBe(expectedResult.numerator);
    expect(actualResult.denominator).toBe(expectedResult.denominator);
  });
});

describe('FRACTION_ADDITION', () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(19, 12);
    let actualResult = FRACTION_ADDITION.operation(op1, op2);
    expect(actualResult.numerator).toBe(expectedResult.numerator);
    expect(actualResult.denominator).toBe(expectedResult.denominator);
  });
});

describe('FRACTION_SUBTRACTION', () => {
  it('should return the correct answer', () => {
    let expectedResult = new FractionResult(-1, 12);
    let actualResult = FRACTION_SUBTRACTION.operation(op1, op2);
    expect(actualResult.numerator).toBe(expectedResult.numerator);
    expect(actualResult.denominator).toBe(expectedResult.denominator);
  });
});
