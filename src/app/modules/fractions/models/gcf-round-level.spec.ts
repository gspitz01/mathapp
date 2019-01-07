import { BasicOperatorQuestion } from "../../../shared/models/basic-operator-question";
import { BasicOperandLimitations } from "../../../shared/models/basic-operand-limitations";
import { GcfRoundLevel } from "./gcf-round-level";

describe("GcfRoundLevel", () => {
  const opLimits = new BasicOperandLimitations(true, 10, true, false);

  it('should create OperatorQuestion', () => {
    let roundLevel = new GcfRoundLevel("Whatevers", 15, opLimits, opLimits, null, 100);
    expect(roundLevel.createQuestion()).toEqual(jasmine.any(BasicOperatorQuestion));
  });

  it("should not produce 1 answer with 0 percent1AnswersAllowed", () => {
    let roundLevel = new GcfRoundLevel("No Ones", 15, opLimits, opLimits, null, 0);
    for (let i = 0; i < 100; i++) {
      let question = roundLevel.createQuestion() as BasicOperatorQuestion;
      if (question.getResult().value === 1) {
        console.log("Result is 1!");
      }
      expect(question.getResult().value).not.toBe(1);
    }
  });
});
