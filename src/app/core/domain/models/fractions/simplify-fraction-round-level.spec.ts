import { FractionResultLimitations } from "./fraction-result-limitations";
import { SimplifyFractionRoundLevel } from "./simplify-fraction-round-level";
import { SimplifyFractionOperatorQuestion } from "./simplify-fraction-operator-question";
import { SIMPLIFY_FRACTION } from "./fraction-operators";
import { BasicOperandLimitations } from "../basics/basic-operand-limitations";
import { BasicResultLimitations } from "../basics/basic-result-limitations";

describe('SimplifyFractionRoundLevel', () => {
  it('should create SimplifyFractionOperatorQuestion on createQuestion()', () => {
    let questionThreshold = 10;
    let numeratorLimit = 4;
    let numLimitations = new BasicOperandLimitations(true, numeratorLimit, false, false);
    let denominatorLimit = 7;
    let denLimitations = new BasicOperandLimitations(true, denominatorLimit, false, false);
    let gcfLimit = 5;
    let resultNumLimitations = new BasicResultLimitations(true, false);
    let resultDenLimitations = new BasicResultLimitations(true, false);
    let resultLimitations = new FractionResultLimitations(resultNumLimitations, resultDenLimitations);

    let round = new SimplifyFractionRoundLevel("Easy Simp", questionThreshold, numLimitations, denLimitations,
      gcfLimit, resultLimitations);
    let question = round.createQuestion() as SimplifyFractionOperatorQuestion;

    expect(question).toEqual(jasmine.any(SimplifyFractionOperatorQuestion));
    expect(question.numerator.value).toBeLessThan(numeratorLimit * (gcfLimit + 2));
    expect(question.denominator.value).toBeLessThan(denominatorLimit * (gcfLimit + 2));
    expect(question.operator).toBe(SIMPLIFY_FRACTION);
  });
});
