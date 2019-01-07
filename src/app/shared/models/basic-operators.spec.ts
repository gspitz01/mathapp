import { MULTIPLICATION, DIVISION, ADDITION, SUBTRACTION } from "./basic-operators";

describe('MULTIPLICATION', () => {
  it('should return the correct result', () => {
    let op1 = 4;
    let op2 = 5;
    let expectedResult = 20;
    let actualResult = MULTIPLICATION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('DIVISION', () => {
  it('should return the correct result', () => {
    let op1 = 20;
    let op2 = 4
    let expectedResult = 5;
    let actualResult = DIVISION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('ADDITION', () => {
  it('should return the correct result', () => {
    let op1 = 20;
    let op2 = 3;
    let expectedResult = 23;
    let actualResult = ADDITION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('SUBTRACTION', () => {
  it('should return the correct result', () => {
    let op1 = 23
    let op2 = 3
    let expectedResult = 20;
    let actualResult = SUBTRACTION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});
