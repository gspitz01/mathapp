import { FractionTimedQuiz } from './fraction-timed-quiz';
import { Seconds } from '../seconds';
import { FRACTION_ADDITION_LEVEL_ORDER } from './fraction-round-levels';
import { FractionTimeLimitedRound } from './fraction-time-limited-round';
import { FractionOperatorQuestion } from './fraction-operator-question';
import { WRONG_ANSWER_TEXT } from '../constants';
import { Stats } from '../stats';

describe('FractionTimedQuiz', () => {
  let quiz: FractionTimedQuiz;

  const startingTime = new Seconds(10);
  const startingLevel = 0;
  const spyAfterEvaluateRound = jasmine.createSpy('AfterEvaluateRound');

  beforeEach(() => {
    quiz = new FractionTimedQuiz(startingTime, startingLevel, FRACTION_ADDITION_LEVEL_ORDER, 'QuizName',
      () => {}, () => {}, spyAfterEvaluateRound);
  });

  it('should create new FractionTimeLimitedRound', () => {
    quiz.startTimer();
    expect(quiz.currentRound).toEqual(jasmine.any(FractionTimeLimitedRound));
    expect(quiz.currentRound.time.value).toBe(startingTime.value);
    expect(quiz.currentRound.level).toBe(FRACTION_ADDITION_LEVEL_ORDER[startingLevel]);
    quiz.stopTimer();
  });

  it('should add wrong answer to incorrects and set wong answer message', () => {
    quiz.startTimer();
    const question = quiz.currentRound.getCurrentQuestion() as FractionOperatorQuestion;
    const answerNum = question.getResult().numerator.value + 1;
    const answerDen = question.getResult().denominator.value;
    quiz.answerQuestion(answerNum + FractionTimedQuiz.ANSWER_DELIMITER + answerDen);
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.incorrects.length).toBe(1);
    expect(retrievedStats.incorrects[0].length).toBe(6);
    expect(retrievedStats.incorrects[0][0]).toBe(question.operand1.numerator.value);
    expect(retrievedStats.incorrects[0][1]).toBe(question.operand1.denominator.value);
    expect(retrievedStats.incorrects[0][2]).toBe(question.operand2.numerator.value);
    expect(retrievedStats.incorrects[0][3]).toBe(question.operand2.denominator.value);
    expect(retrievedStats.incorrects[0][4]).toBe(answerNum);
    expect(retrievedStats.incorrects[0][5]).toBe(answerDen);
  });

  it('should add NaN to incorrects if answer not proper fraction', () => {
    quiz.startTimer();
    quiz.answerQuestion('ClearlyNotAFraction');
    quiz.answerQuestion('3/x');
    quiz.answerQuestion('4');
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.incorrects.length).toBe(3);
    expect(retrievedStats.incorrects[0].length).toBe(6);
    expect(retrievedStats.incorrects[0][4]).toEqual(NaN);
    expect(retrievedStats.incorrects[0][5]).toEqual(NaN);
    expect(retrievedStats.incorrects[1].length).toBe(6);
    expect(retrievedStats.incorrects[1][4]).toEqual(NaN);
    expect(retrievedStats.incorrects[1][5]).toEqual(NaN);
    expect(retrievedStats.incorrects[2].length).toBe(6);
    expect(retrievedStats.incorrects[2][4]).toEqual(NaN);
    expect(retrievedStats.incorrects[2][5]).toEqual(NaN);
  });
});
