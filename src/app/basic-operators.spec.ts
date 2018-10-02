import { Operand } from "./operand";
import { Result } from "./result";
import { MULTIPLICATION, DIVISION, ADDITION, SUBTRACTION } from "./basic-operators";

describe('MULTIPLICATION', () => {
  it('should return the correct result', () => {
    let op1 = new Operand("4", 4);
    let op2 = new Operand("5", 5);
    let expectedResult = new Result("20", 20);
    let actualResult = MULTIPLICATION.operation(op1, op2);
    expect(actualResult.display).toBe(expectedResult.display);
    expect(actualResult.value).toBe(expectedResult.value);
  });
});

describe('DIVISION', () => {
  it('should return the correct result', () => {
    let op1 = new Operand("20", 20);
    let op2 = new Operand("4", 4);
    let expectedResult = new Result("5", 5);
    let actualResult = DIVISION.operation(op1, op2);
    expect(actualResult.display).toBe(expectedResult.display);
    expect(actualResult.value).toBe(expectedResult.value);
  });
});

describe('ADDITION', () => {
  it('should return the correct result', () => {
    let op1 = new Operand("20", 20);
    let op2 = new Operand("3", 3);
    let expectedResult = new Result("23", 23);
    let actualResult = ADDITION.operation(op1, op2);
    expect(actualResult.display).toBe(expectedResult.display);
    expect(actualResult.value).toBe(expectedResult.value);
  });
});

describe('SUBTRACTION', () => {
  it('should return the correct result', () => {
    let op1 = new Operand("23", 23);
    let op2 = new Operand("3", 3);
    let expectedResult = new Result("20", 20);
    let actualResult = SUBTRACTION.operation(op1, op2);
    expect(actualResult.display).toBe(expectedResult.display);
    expect(actualResult.value).toBe(expectedResult.value);
  });
});
