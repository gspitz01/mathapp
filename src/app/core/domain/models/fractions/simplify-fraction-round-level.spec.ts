import { FractionResultLimitations } from './fraction-result-limitations';
import { SimplifyFractionRoundLevel } from './simplify-fraction-round-level';
import { SimplifyFractionOperatorQuestion } from './simplify-fraction-operator-question';
import { SIMPLIFY_FRACTION } from './fraction-operators';
import { BasicOperandLimitations } from '../basics/basic-operand-limitations';
import { BasicResultLimitations } from '../basics/basic-result-limitations';

describe('SimplifyFractionRoundLevel', () => {
  it('should create SimplifyFractionOperatorQuestion on createQuestion()', () => {
    const questionThreshold = 10;
    const numeratorLimit = 4;
    const numLimitations = new BasicOperandLimitations(true, 1, numeratorLimit, false);
    const denominatorLimit = 7;
    const denLimitations = new BasicOperandLimitations(true, 1, denominatorLimit, false);
    const gcfLimit = 5;
    const resultNumLimitations = new BasicResultLimitations(true, false);
    const resultDenLimitations = new BasicResultLimitations(true, false);
    const resultLimitations = new FractionResultLimitations(resultNumLimitations, resultDenLimitations);

    const round = new SimplifyFractionRoundLevel('Easy Simp', questionThreshold, numLimitations, denLimitations,
      gcfLimit, resultLimitations);
    const question = round.createQuestion() as SimplifyFractionOperatorQuestion;

    expect(question).toEqual(jasmine.any(SimplifyFractionOperatorQuestion));
    expect(question.numerator.value).toBeLessThan(numeratorLimit * (gcfLimit + 2));
    expect(question.denominator.value).toBeLessThan(denominatorLimit * (gcfLimit + 2));
    expect(question.operator).toBe(SIMPLIFY_FRACTION);
  });
});
