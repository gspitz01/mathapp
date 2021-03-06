import { BasicQuestionLimitedRound } from './basic-question-limited-round';
import { BasicOperatorQuestion } from './basic-operator-question';
import { ADDITION } from './basic-operators';
import { AnswerEvaluation } from '../answer-evaluation';
import { BASIC_ADDITION_LEVEL_ORDER } from './basic-addition-round-levels';

describe('BasicQuestionLimitedRound', () => {
  const testLevel = BASIC_ADDITION_LEVEL_ORDER[1];
  const testNumberOfQuestions = 20;
  const unstartedRound = new BasicQuestionLimitedRound(testNumberOfQuestions, testLevel);
  const startedRound = new BasicQuestionLimitedRound(testNumberOfQuestions, testLevel);
  startedRound.start();

  it('before start, getCurrentQuestion should return null', () => {
    expect(unstartedRound.getCurrentQuestion()).toBeNull();
  });

  it('before start, answerQuestion returns null', () => {
    expect(unstartedRound.answerQuestion('45')).toBeNull();
  });

  it('before start, getNumberOfQuestionsAnswered returns 0', () => {
    expect(unstartedRound.getNumberOfQuestionsAnswered()).toBe(0);
  });

  it('before start, getNumberOfWrongAnswers returns 0', () => {
    expect(unstartedRound.getNumberOfWrongAnswers()).toBe(0);
  });

  it('calling start creates first question', () => {
    const round = new BasicQuestionLimitedRound(testNumberOfQuestions, testLevel);
    spyOn(testLevel, 'createQuestion');
    round.start();
    expect(testLevel.createQuestion).toHaveBeenCalled();
  });

  it('after start, getCurrentQuestion returns a question with the right operator', () => {
    const question = startedRound.getCurrentQuestion();
    expect(question).toEqual(jasmine.any(BasicOperatorQuestion));
    expect(question.operator).toBe(ADDITION);
  });

  it('after start, getting question again without answer gets same question', () => {
    const question = startedRound.getCurrentQuestion();
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, answerQuestion returns an AnswerEvaluation', () => {
    expect(startedRound.answerQuestion('43')).toEqual(jasmine.any(AnswerEvaluation));
  });
});
