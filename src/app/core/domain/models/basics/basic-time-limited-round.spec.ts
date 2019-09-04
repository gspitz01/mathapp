import { BasicTimeLimitedRound } from './basic-time-limited-round';
import { Seconds } from '../seconds';
import { ADDITION } from './basic-operators';
import { AnswerEvaluation } from '../answer-evaluation';
import { BasicResult } from './basic-result';
import { BASIC_ADDITION_LEVEL_ORDER } from './basic-addition-round-levels';

describe('BasicTimeLimitedRound', () => {
  const initialTime = new Seconds(60);
  const testLevel = BASIC_ADDITION_LEVEL_ORDER[1];
  let unstartedRound: BasicTimeLimitedRound;
  let startedRound: BasicTimeLimitedRound;

  beforeEach(() => {
    unstartedRound = new BasicTimeLimitedRound(initialTime, testLevel);
    startedRound = new BasicTimeLimitedRound(initialTime, testLevel);
    startedRound.start();
  });

  it('before start, getCurrentQuestion should return null', () => {
    expect(unstartedRound.getCurrentQuestion()).toBeNull();
  });

  it('before start, getTimeRemaining should return initial time', () => {
    expect(unstartedRound.getTimeRemaining().value).toBe(initialTime.value);
  });

  it('before start, answerQuestion returns null', () => {
    expect(unstartedRound.answerQuestion('6')).toBeNull();
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
    const round = new BasicTimeLimitedRound(initialTime, testLevel);
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
    const question = startedRound.getCurrentQuestion();
    expect(question.operator).toBe(ADDITION);
  });

  it('after start, getting question without answering gets the same question', () => {
    const question = startedRound.getCurrentQuestion();
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, getting question after correct answer, gets new question', () => {
    const question = startedRound.getCurrentQuestion();
    const result = question.getResult() as BasicResult;
    startedRound.answerQuestion(result.value + '');
    expect(startedRound.getCurrentQuestion()).not.toBe(question);
  });

  it('after start, getting question after incorrect answer, gets same question', () => {
    const question = startedRound.getCurrentQuestion();
    const result = question.getResult() as BasicResult;
    startedRound.answerQuestion((result.value + 1) + '');
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, answering correctly increases questionsAnswered', () => {
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(0);
    const question = startedRound.getCurrentQuestion();
    const result = question.getResult() as BasicResult;
    startedRound.answerQuestion(result.value + '');
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it('after start, answering incorrectly increases questionsAnswered first time, but not subsequent times', () => {
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(0);

    const question = startedRound.getCurrentQuestion();
    const result = question.getResult() as BasicResult;
    startedRound.answerQuestion((result.value + 1) + '');

    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);

    startedRound.answerQuestion((result.value + 1) + '');
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it('after start, answering incorrectly increases questionsAnswered, but then answering that question correctly does not', () => {
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(0);

    const question = startedRound.getCurrentQuestion();
    const result = question.getResult() as BasicResult;
    startedRound.answerQuestion((result.value + 1) + '');

    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);

    startedRound.answerQuestion(result.value + '');
    expect(startedRound.getNumberOfQuestionsAnswered()).toBe(1);
  });

  it('after start, answering incorrectly increases wrongAnswers, even for same question', () => {
    expect(startedRound.getNumberOfWrongAnswers()).toBe(0);

    const question = startedRound.getCurrentQuestion();
    const result = question.getResult() as BasicResult;
    startedRound.answerQuestion((result.value + 1) + '');

    expect(startedRound.getNumberOfWrongAnswers()).toBe(1);

    startedRound.answerQuestion((result.value + 1) + '');
    expect(startedRound.getNumberOfWrongAnswers()).toBe(2);
  });
  it('after start, answerQuestion returns an AnswerEvaluation', () => {
    expect(startedRound.answerQuestion('42')).toEqual(jasmine.any(AnswerEvaluation));
  });

  it('after time runs out, answerQuestion return null', () => {
    for (let i = 0; i < initialTime.value; i++) {
      startedRound.tick();
    }
    expect(startedRound.getTimeRemaining().value).toBe(0);
    expect(startedRound.answerQuestion('45')).toBeNull();
  });
});
