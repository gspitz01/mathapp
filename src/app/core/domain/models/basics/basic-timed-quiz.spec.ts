import { BasicTimedQuiz } from "./basic-timed-quiz";
import { Seconds } from "../seconds";
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from "./basic-multiplication-round-levels";
import { BasicTimeLimitedRound } from "./basic-time-limited-round";
import { BasicResult } from "./basic-result";
import { Stats } from "../stats";
import { BasicOperatorQuestion } from "./basic-operator-question";
import { WRONG_ANSWER_TEXT } from "../constants";

describe("BasicTimedQuiz", () => {
  let quiz: BasicTimedQuiz;

  const startingTime = new Seconds(10);
  const startingLevel = 0;
  const spyAfterEvaluateRound = jasmine.createSpy("AfterEvaluateRound");

  beforeEach(() => {
    quiz = new BasicTimedQuiz(startingTime, startingLevel, BASIC_MULTIPLICATION_LEVEL_ORDER[0],
      "Multi", () => {}, () => {}, spyAfterEvaluateRound);
  });

  it("should create new round of BasicTimeLimitedRound", () => {
    quiz.startTimer();
    expect(quiz.currentRound).toEqual(jasmine.any(BasicTimeLimitedRound));
    expect(quiz.currentRound.time.value).toBe(startingTime.value);
    expect(quiz.currentRound.level).toBe(BASIC_MULTIPLICATION_LEVEL_ORDER[0][startingLevel]);
    quiz.stopTimer();
  });

  it("should add wrong answer to incorrects and set messages to wrong answer message", () => {
    quiz.startTimer();
    const question = quiz.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    const answer = (question.getResult() as BasicResult).value + 1;
    quiz.answerQuestion("" + answer);
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.incorrects.length).toBe(1);
    expect(retrievedStats.incorrects[0].length).toBe(3);
    expect(retrievedStats.incorrects[0][0]).toBe(question.operand1.value);
    expect(retrievedStats.incorrects[0][1]).toBe(question.operand2.value);
    expect(retrievedStats.incorrects[0][2]).toBe(answer);
  });

  it("should add NaN to wrongs answers if answer not a number", () => {
    quiz.startTimer();
    quiz.answerQuestion("Not a number");
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.incorrects.length).toBe(1);
    expect(retrievedStats.incorrects[0].length).toBe(3);
    expect(retrievedStats.incorrects[0][2]).toEqual(NaN);
  });
});
