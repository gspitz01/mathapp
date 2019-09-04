import { GcfRoundLevel } from './gcf-round-level';
import { BasicOperandLimitations } from './basic-operand-limitations';
import { BasicOperatorQuestion } from './basic-operator-question';

describe('GcfRoundLevel', () => {
  const opLimits = new BasicOperandLimitations(true, 1, 10, true);

  it('should create OperatorQuestion', () => {
    const roundLevel = new GcfRoundLevel('Whatevers', 15, opLimits, opLimits);
    expect(roundLevel.createQuestion()).toEqual(jasmine.any(BasicOperatorQuestion));
  });
});
