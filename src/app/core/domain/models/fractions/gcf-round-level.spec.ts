import { GcfRoundLevel } from './gcf-round-level';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';
import { BasicOperatorQuestion } from '../basics/basic-operator-question';

describe('GcfRoundLevel', () => {
  const opLimits = new BasicOperandLimitations(true, 10, true, false);

  it('should create OperatorQuestion', () => {
    const roundLevel = new GcfRoundLevel('Whatevers', 15, opLimits, opLimits);
    expect(roundLevel.createQuestion()).toEqual(jasmine.any(BasicOperatorQuestion));
  });
});
