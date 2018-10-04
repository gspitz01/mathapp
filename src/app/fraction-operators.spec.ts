import { FractionOperand } from "./fraction-operand";
import { Operand } from "./operand";
import { FractionResult } from "./fraction-result";
import { Result } from "./result";
import { FRACTION_MULTIPLICATION, FRACTION_DIVISION, FRACTION_ADDITION, FRACTION_SUBTRACTION } from './fraction-operators';

let op1 = new FractionOperand(new Operand("3", 3), new Operand("4", 4));
let op2 = new FractionOperand(new Operand("5", 5), new Operand("6", 6));

describe('FRACTION_MULTIPLICATION', () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(new Result("5", 5), new Result("8", 8));
    let actualResult = FRACTION_MULTIPLICATION.operation(op1, op2);
    expect(actualResult.numerator.display).toBe(expectedResult.numerator.display);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.display).toBe(expectedResult.denominator.display);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});

describe("FRACTION_DIVISION", () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(new Result("9", 9), new Result("10", 10));
    let actualResult = FRACTION_DIVISION.operation(op1, op2);
    expect(actualResult.numerator.display).toBe(expectedResult.numerator.display);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.display).toBe(expectedResult.denominator.display);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});

describe('FRACTION_ADDITION', () => {
  it('should return correct result', () => {
    let expectedResult = new FractionResult(new Result("19", 19), new Result("12", 12));
    let actualResult = FRACTION_ADDITION.operation(op1, op2);
    expect(actualResult.numerator.display).toBe(expectedResult.numerator.display);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.display).toBe(expectedResult.denominator.display);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});

describe('FRACTION_SUBTRACTION', () => {
  it('should return the correct answer', () => {
    let expectedResult = new FractionResult(new Result("-1", -1), new Result("12", 12));
    let actualResult = FRACTION_SUBTRACTION.operation(op1, op2);
    expect(actualResult.numerator.display).toBe(expectedResult.numerator.display);
    expect(actualResult.numerator.value).toBe(expectedResult.numerator.value);
    expect(actualResult.denominator.display).toBe(expectedResult.denominator.display);
    expect(actualResult.denominator.value).toBe(expectedResult.denominator.value);
  });
});
