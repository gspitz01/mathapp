import { QuestionRound } from "./question-round";
import { RoundLevel } from "./round-level";
import { OperatorQuestion } from "./operator-question";
import { Operator } from "./operator";
import { Result } from "./result";
import { ADDITION } from "./basics/basic-operators";

describe("QuestionRound", () => {
  const correctAnswerNumber = 4;

  class MockQuestionRound extends QuestionRound {}

  class MockResult implements Result {
    constructor(readonly value: number) {}
  }

  class MockOperatorQuestion implements OperatorQuestion {
    constructor(readonly operator: Operator) {}

    getResult(): Result {
      return new MockResult(correctAnswerNumber);
    }

    checkAnswer(answer: string): boolean {
      return parseInt(answer) == (this.getResult() as MockResult).value;
    }
  }

  class MockRoundLevel extends RoundLevel {
    createQuestion(): OperatorQuestion {
      return new MockOperatorQuestion(this.chooseOperator());
    }
  }

  const roundLevel = new MockRoundLevel("name", [ADDITION], 15);
  let round: MockQuestionRound;

  beforeEach(() => {
    round = new MockQuestionRound(roundLevel);
  });

  it("should return null on getCurrentQuestion() before starting", () => {
    expect(round.getCurrentQuestion()).toBeFalsy();
  });

  it("should return a question on getCurrentQuestion() after starting", () => {
    round.start();
    expect(round.getCurrentQuestion()).toBeTruthy();
  });

  it("should return 0 on getNumberOfQuestionsAnswered() without answering a question", () => {
    expect(round.getNumberOfQuestionsAnswered()).toBe(0);
  });

  it("should return 1 on getNumberOfQuestionsAnswered() after answering a question", () => {
    round.start();
    round.answerQuestion("34");
    expect(round.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it("should not increase getNumberOfQuestionsAnswered() after answering incorrectly and then correctly the same question", () => {
    round.start();
    const question1 = round.getCurrentQuestion();
    round.answerQuestion("" + (correctAnswerNumber + 1));
    expect(round.getNumberOfQuestionsAnswered()).toBe(1);
    expect(round.getCurrentQuestion()).toBe(question1);
    round.answerQuestion("" + correctAnswerNumber);
    expect(round.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it("should return 0 on getNumberOfWrongAnswers() without answering", () => {
    expect(round.getNumberOfWrongAnswers()).toBe(0);
  });

  it("should return correct number of wrong answer on getNumberOfWrongAnswers()", () => {
    round.start();
    round.answerQuestion("" + (correctAnswerNumber + 1));
    expect(round.getNumberOfWrongAnswers()).toBe(1);
    round.answerQuestion("" + (correctAnswerNumber + 1));
    expect(round.getNumberOfWrongAnswers()).toBe(2);
  });

  it("should return null on answerQuestion() before starting", () => {
    expect(round.answerQuestion("34")).toBeFalsy();
  });

  it("should create new question if question answered correctly", () => {
    round.start();
    const question1 = round.getCurrentQuestion();
    const answerEval = round.answerQuestion("" + correctAnswerNumber);
    expect(answerEval.correct).toBeTruthy();
    expect(round.getCurrentQuestion()).not.toBe(question1);
  });

  it("should not create new question if question answer incorrectly", () => {
    round.start();
    const question1 = round.getCurrentQuestion();
    const answerEval = round.answerQuestion("" + (correctAnswerNumber + 1));
    expect(answerEval.correct).toBeFalsy();
    expect(round.getCurrentQuestion()).toBe(question1);
  });
});
