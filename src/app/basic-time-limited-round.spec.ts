import { BasicTimeLimitedRound } from './basic-time-limited-round';
import { Seconds } from './seconds';
import { LEVEL_ORDER } from './round-levels';
import { ADDITION } from './basic-operators';
import { AnswerEvaluation } from './answer-evaluation';

describe('BasicTimeLimitedRound', () => {
  let initialTime = new Seconds(60);
  let testLevel = LEVEL_ORDER[1];
  let unstartedRound = new BasicTimeLimitedRound(initialTime, testLevel);
  let startedRound = new BasicTimeLimitedRound(initialTime, testLevel);
  startedRound.start();

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

  it('before start, getNumberOfCorrectAnswers returns 0', () => {
    expect(unstartedRound.getNumberOfCorrectAnswers()).toBe(0);
  });

  it('calling start creates first question', () => {
    let round = new BasicTimeLimitedRound(initialTime, testLevel);
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
    expect(question.operator).toBe(ADDITION);
  });

  it('after start, getting question without answering gets the same question', () => {
    let question = startedRound.getCurrentQuestion();
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, getting question after answering get new quesstion', () => {
    let question = startedRound.getCurrentQuestion();
    startedRound.answerQuestion("45");
    expect(startedRound.getCurrentQuestion()).not.toBe(question);
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
