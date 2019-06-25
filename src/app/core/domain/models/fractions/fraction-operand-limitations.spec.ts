import { FractionOperandLimitations } from './fraction-operand-limitations';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';
import { FractionOperand } from './fraction-operand';

describe('FractionOperandLimitations', () => {
  it('should create a FractionOperand on createOperand()', () => {
    const numLimitations = new BasicOperandLimitations(true, 10, false, true);
    const denLimitations = new BasicOperandLimitations(true, 60, false, false);
    const limitations = new FractionOperandLimitations(numLimitations, denLimitations);
    const operand = limitations.createOperand();

    expect(operand).toEqual(jasmine.any(FractionOperand));
  });
});
