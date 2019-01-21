import { BasicOperatorQuestion } from "../../../shared/models/basic-operator-question";
import { BasicOperandLimitations } from "../../../shared/models/basic-operand-limitations";
import { GcfRoundLevel } from "./gcf-round-level";

describe("GcfRoundLevel", () => {
  const opLimits = new BasicOperandLimitations(true, 10, true, false);

  it('should create OperatorQuestion', () => {
    let roundLevel = new GcfRoundLevel("Whatevers", 15, opLimits, opLimits);
    expect(roundLevel.createQuestion()).toEqual(jasmine.any(BasicOperatorQuestion));
  });
});
