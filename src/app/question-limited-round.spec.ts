import { QuestionLimitedRound } from './question-limited-round';
import { LEVEL_ORDER } from './round-levels';
import { BasicOperatorQuestion } from './basic-operator-question';
import { ADDITION } from './basic-operators';
import { AnswerEvaluation } from './answer-evaluation';

describe('QuestionLimitedRound', () => {
  let testLevel = LEVEL_ORDER[0];
  let testNumberOfQuestions = 20;
  let unstartedRound = new QuestionLimitedRound(testNumberOfQuestions, testLevel);
  let startedRound = new QuestionLimitedRound(testNumberOfQuestions, testLevel);
  startedRound.start();

  it('before start, getCurrentQuestion should return null', () => {
    expect(unstartedRound.getCurrentQuestion()).toBeNull();
  });

  it('before start, answerQuestion returns null', () => {
    expect(unstartedRound.answerQuestion("45")).toBeNull();
  });

  it('before start, getNumberOfQuestionsAnswered returns 0', () => {
    expect(unstartedRound.getNumberOfQuestionsAnswered()).toBe(0);
  });

  it('before start, getNumberOfCorrectAnswers returns 0', () => {
    expect(unstartedRound.getNumberOfCorrectAnswers()).toBe(0);
  })

  it('calling start creates first question', () => {
    let round = new QuestionLimitedRound(testNumberOfQuestions, testLevel);
    spyOn(testLevel, "createQuestion");
    round.start();
    expect(testLevel.createQuestion).toHaveBeenCalled();
  });

  it('after start, getCurrentQuestion returns a question with the right operator', () => {
    let question = startedRound.getCurrentQuestion();
    expect(question).toEqual(jasmine.any(BasicOperatorQuestion));
    expect(question.operator).toBe(ADDITION);
  });

  it('after start, getting question again without answer gets same question', () => {
    let question = startedRound.getCurrentQuestion();
    expect(startedRound.getCurrentQuestion()).toBe(question);
  });

  it('after start, answerQuestion returns an AnswerEvaluation', () => {
    expect(startedRound.answerQuestion("43")).toEqual(jasmine.any(AnswerEvaluation));
  });
});
