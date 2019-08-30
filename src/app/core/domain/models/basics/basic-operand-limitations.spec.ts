import { BasicOperandLimitations } from './basic-operand-limitations';

describe('BasicOperandLimitations', () => {

  it('should create operand correctly using limitations', () => {
    let limitations = new BasicOperandLimitations(true, 1, 10, false);
    for (let i = 0; i < 100; i++) {
      const opValue = limitations.createOperand().value;
      expect(Number.isInteger(opValue)).toBeTruthy();
      expect(opValue).toBeLessThan(10);
      expect(opValue).not.toBe(0);
      expect(opValue).toBeGreaterThan(0);
    }

    limitations = new BasicOperandLimitations(false, 1, 100, true);
    for (let i = 0; i < 100; i++) {
      const opValue = limitations.createOperand().value;
      expect(opValue).toBeGreaterThan(-100);
      expect(opValue).toBeLessThan(100);
      expect(opValue).not.toBe(0);
    }
  });

});
