import { MULTIPLICATION, DIVISION, ADDITION, SUBTRACTION } from './basic-operators';

describe('MULTIPLICATION', () => {
  it('should return the correct result', () => {
    const op1 = 4;
    const op2 = 5;
    const expectedResult = 20;
    const actualResult = MULTIPLICATION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('DIVISION', () => {
  it('should return the correct result', () => {
    const op1 = 20;
    const op2 = 4;
    const expectedResult = 5;
    const actualResult = DIVISION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('ADDITION', () => {
  it('should return the correct result', () => {
    const op1 = 20;
    const op2 = 3;
    const expectedResult = 23;
    const actualResult = ADDITION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('SUBTRACTION', () => {
  it('should return the correct result', () => {
    const op1 = 23;
    const op2 = 3;
    const expectedResult = 20;
    const actualResult = SUBTRACTION.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toBe(expectedResult);
  });
});
