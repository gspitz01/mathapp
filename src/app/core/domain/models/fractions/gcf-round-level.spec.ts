import { GcfRoundLevel } from "./gcf-round-level";
import { BasicOperandLimitations } from "../basic-operand-limitations";
import { BasicOperatorQuestion } from "../basic-operator-question";

describe("GcfRoundLevel", () => {
  const opLimits = new BasicOperandLimitations(true, 10, true, false);

  it('should create OperatorQuestion', () => {
    let roundLevel = new GcfRoundLevel("Whatevers", 15, opLimits, opLimits);
    expect(roundLevel.createQuestion()).toEqual(jasmine.any(BasicOperatorQuestion));
  });
});
