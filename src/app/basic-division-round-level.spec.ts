import { BasicDivisionRoundLevel } from "./basic-division-round-level";
import { BasicOperatorQuestion } from "./basic-operator-question";
import { DIVISION } from "./basic-operators";

describe("BasicDivisionRoundLevel", () => {
  it("should create BasicOperatorQuestion on createQuestion with correct focus number", () => {
    let focusNumber = 2;
    let resultLowerLimit = 0;
    let resultUpperLimit = 12;
    let level = new BasicDivisionRoundLevel("Whatever", 10, focusNumber, resultLowerLimit, resultUpperLimit);
    let question = level.createQuestion() as BasicOperatorQuestion;
    let result = question.getResult().value;
    expect(question.operator).toBe(DIVISION);
    expect(question.operand2.value).toBe(focusNumber);
    expect(result >= resultLowerLimit).toBeTruthy();
    expect(result <= resultUpperLimit).toBeTruthy();
    expect(result % 1 === 0).toBeTruthy();
  });

  it("should create questions with each possible result", () => {
    let testResultLimits = function(lowerLimit, upperLimit) {
      let focusNumber = 2;
      let resultLimitDifference = upperLimit - lowerLimit;
      let level = new BasicDivisionRoundLevel("Whatever", 10, focusNumber, lowerLimit, upperLimit);
      let resultsSeen: number[] = [];
      for (let i = 0; i <= resultLimitDifference; i++) {
        let question = level.createQuestion() as BasicOperatorQuestion;
        let result = question.getResult().value;
        expect(resultsSeen.includes(result)).toBeFalsy();
        resultsSeen.push(result);
      }
    }
    testResultLimits(0, 12);
    testResultLimits(10, 20);
  });
});
