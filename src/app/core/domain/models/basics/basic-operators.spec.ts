import { MULTIPLICATION, DIVISION, ADDITION, SUBTRACTION, GCF, EXPONENTIATION, LCM } from './basic-operators';

describe('MULTIPLICATION', () => {
  it('should return the correct result', () => {
    const op1 = 4;
    const op2 = 5;
    const expectedResult = 20;
    const actualResult = MULTIPLICATION.operation(op1, op2);
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
  });
});

describe('ADDITION', () => {
  it('should return the correct result', () => {
    const op1 = 20;
    const op2 = 3;
    const expectedResult = 23;
    const actualResult = ADDITION.operation(op1, op2);
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
  });
});

describe('GCF', () => {
  it('should return the correct result', () => {
    const op1 = 24;
    const op2 = 6;
    const expectedResult = 6;
    const actualResult = GCF.operation(op1, op2);
    expect(actualResult).toBe(expectedResult);
  });
});

describe('LCM', () => {
  it('should return the correct result', () => {
    expect(LCM.operation(24, 18)).toBe(72);
  });
});

describe('EXPONENT', () => {
  it('should return the correct result', () => {
    const op1 = 3;
    const op2 = 4;
    const expectedResult = 81;
    expect(EXPONENTIATION.operation(op1, op2)).toBe(expectedResult);
  });
});
