import { FractionTimeLimitedRound } from "./fraction-time-limited-round";
import { FRACTION_ADDITION_LEVEL_ORDER } from "./fraction-round-levels";
import { FRACTION_ADDITION } from "./fraction-operators";
import { FractionResult } from "./fraction-result";
import { Seconds } from "../seconds";
import { AnswerEvaluation } from "../answer-evaluation";

describe("FractionTimeLimitedRound", () => {
  let initialTime = new Seconds(60);
  let testLevel = FRACTION_ADDITION_LEVEL_ORDER[1];
  let unstartedRound: FractionTimeLimitedRound;
  let startedRound: FractionTimeLimitedRound;

  beforeEach(() => {
    unstartedRound = new FractionTimeLimitedRound(initialTime, testLevel);
    startedRound = new FractionTimeLimitedRound(initialTime, testLevel);
    startedRound.start();
  });

  it('before start, getCurrentQuestion should return null', () => {
    expect(unstartedRound.getCurrentQuestion()).toBeNull();
  });

  it('before start, getTimeRemaining should return initial time', () => {
    expect(unstartedRound.getTimeRemaining().value).toBe(initialTime.value);
  });

  it('before start, answerQuestion returns null', () => {
    expect(unstartedRound.answerQuestion("6")).toBeNull();
  });

  it('before start, tick does not decrease time remaining', () => {
    expect(unstartedRound.getTimeRemaining().value).toBe(initialTime.value);
    unstartedRound.tick();
    expect(unstartedRound.getTimeRemaining().value).toBe(initialTime.value);
  });

  it('before start, getNumberOfQuestionsAnswered returns 0', () => {
    expect(unstartedRound.getNumberOfQuestionsAnswered()).toBe(0);
  });

  it('before start, getNumberOfWrongAnswers returns 0', () => {
    expect(unstartedRound.getNumberOfWrongAnswers()).toBe(0);
  });

  it('calling start creates first question', () => {
    let round = new FractionTimeLimitedRound(initialTime, testLevel);
    spyOn(testLevel, 'createQuestion');
    round.start();
    expect(testLevel.createQuestion).toHaveBeenCalled();
  });

  it('after start, tick should decrease time remaining', () => {
    expect(startedRound.getTimeRemaining().value).toBe(initialTime.value);
    startedRound.tick();
    expect(startedRound.getTimeRemaining().value).toBe(initialTime.value - 1);
  });

  it('after start, getCurrentQuestion should return a question with the right operator', () => {
    let question = startedRound.getCurrentQuestion();
    expect(question.operator).toBe(FRACTION_ADDITION);
  });

  it('after start, getting question without answering gets the same question', () => {
    let question = startedRound.getCurrentQuestion();
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, getting question after correct answer, gets new question', () => {
    let question = startedRound.getCurrentQuestion();
    let result = question.getResult() as FractionResult;
    startedRound.answerQuestion(result.numerator.value + "/" + result.denominator.value);
    expect(startedRound.getCurrentQuestion()).not.toBe(question);
  });

  it('after start, getting question after incorrect answer, gets same question', () => {
    let question = startedRound.getCurrentQuestion();
    let result = question.getResult() as FractionResult;
    let answerNum = result.numerator.value + 1;
    startedRound.answerQuestion(answerNum + "/" + result.denominator);
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, answering correctly increases questionsAnswered', () => {
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(0);
    let question = startedRound.getCurrentQuestion();
    let result = question.getResult() as FractionResult;
    startedRound.answerQuestion(result.numerator.value + "/" + result.denominator.value);
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it('after start, answering incorrectly increases questionsAnswered first time, but not subsequent times', () => {
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(0);

    let question = startedRound.getCurrentQuestion();
    let result = question.getResult() as FractionResult;
    startedRound.answerQuestion((result.numerator.value + 1) + "/" + result.denominator.value);

    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);

    startedRound.answerQuestion((result.numerator.value + 1) + "/" + result.denominator.value);
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it('after start, answering incorrectly increases questionsAnswered, but then answering that question correctly does not', () => {
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(0);

    let question = startedRound.getCurrentQuestion();
    let result = question.getResult() as FractionResult;
    startedRound.answerQuestion((result.numerator.value + 1) + "/" + result.denominator.value);

    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);

    startedRound.answerQuestion(result.numerator.value + "/" + result.denominator.value);
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it('after start, answering incorrectly increases wrongAnswers, even for same question', () => {
    expect(startedRound.getNumberOfWrongAnswers()).toBe(0);

    let question = startedRound.getCurrentQuestion();
    let result = question.getResult() as FractionResult;
    startedRound.answerQuestion((result.numerator.value + 1) + "/" + result.denominator.value);

    expect(startedRound.getNumberOfWrongAnswers()).toBe(1);

    startedRound.answerQuestion((result.numerator.value + 1) + "/" + result.denominator.value);
    expect(startedRound.getNumberOfWrongAnswers()).toBe(2);
  });

  it('after start, answerQuestion returns an AnswerEvaluation', () => {
    expect(startedRound.answerQuestion("42")).toEqual(jasmine.any(AnswerEvaluation));
  });

  it('after time runs out, answerQuestion return null', () => {
    for (let i = 0; i < initialTime.value; i++) {
      startedRound.tick();
    }
    expect(startedRound.getTimeRemaining().value).toBe(0);
    expect(startedRound.answerQuestion("45")).toBeNull();
  });
});
