import { SimplifyFractionTimedQuiz } from './simplify-fraction-timed-quiz';
import { SIMPLIFY_FRACTION_LEVEL_ORDER } from './simplify-fraction-round-levels';
import { Seconds } from '../seconds';
import { SimplifyFractionTimeLimitedRound } from './simplify-fraction-time-limited-round';
import { SimplifyFractionOperatorQuestion } from './simplify-fraction-operator-question';
import { FractionResult } from './fraction-result';
import { WRONG_ANSWER_TEXT, OPERATORS_DB_MAP } from '../constants';
import { Stats } from '../stats';
import { SIMPLIFY_FRACTION } from './fraction-operators';

describe('SimplifyFractionTimedQuiz', () => {
  let quiz: SimplifyFractionTimedQuiz;

  // incorrects
  const incorrectLength = 6;
  const incorrectAnsNumIndex = 3;
  const incorrectAnsDenIndex = 4;

  const startingTime = new Seconds(10);
  const startingLevel = 0;
  const spyAfterEvaluateRound = jasmine.createSpy('AfterEvaluateRound');

  beforeEach(() => {
    quiz = new SimplifyFractionTimedQuiz(startingTime, startingLevel, SIMPLIFY_FRACTION_LEVEL_ORDER,
      'Semper Fi', () => {}, () => {}, spyAfterEvaluateRound);
  });

  it('should create new SimplifyFractionTimeLimitedRound', () => {
    quiz.startTimer();
    expect(quiz.currentRound).toEqual(jasmine.any(SimplifyFractionTimeLimitedRound));
    expect(quiz.currentRound.time.value).toBe(startingTime.value);
    expect(quiz.currentRound.level).toBe(SIMPLIFY_FRACTION_LEVEL_ORDER[startingLevel]);
    quiz.stopTimer();
  });

  it('should add wrong answer to incorrects and set wrong answer message', () => {
    quiz.startTimer();
    const question = quiz.currentRound.getCurrentQuestion() as SimplifyFractionOperatorQuestion;
    const answerNum = (question.getResult() as FractionResult).numerator.value + 1;
    const answerDen = (question.getResult() as FractionResult).denominator.value;
    quiz.answerQuestion(answerNum + SimplifyFractionTimedQuiz.ANSWER_DELIMITER + answerDen);
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.incorrects.length).toBe(1);
    expect(retrievedStats.incorrects[0].length).toBe(incorrectLength);
    expect(retrievedStats.incorrects[0][0]).toBe(OPERATORS_DB_MAP.indexOf(SIMPLIFY_FRACTION));
    expect(retrievedStats.incorrects[0][1]).toBe(question.numerator.value);
    expect(retrievedStats.incorrects[0][2]).toBe(question.denominator.value);
    expect(retrievedStats.incorrects[0][3]).toBe(answerNum);
    expect(retrievedStats.incorrects[0][4]).toBe(answerDen);
    expect(retrievedStats.incorrects[0][5]).toBe(0);
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
    expect(retrievedStats.incorrects[0].length).toBe(incorrectLength);
    expect(retrievedStats.incorrects[0][incorrectAnsNumIndex]).toEqual(NaN);
    expect(retrievedStats.incorrects[0][incorrectAnsDenIndex]).toEqual(NaN);
    expect(retrievedStats.incorrects[1].length).toBe(incorrectLength);
    expect(retrievedStats.incorrects[1][incorrectAnsNumIndex]).toEqual(NaN);
    expect(retrievedStats.incorrects[1][incorrectAnsDenIndex]).toEqual(NaN);
    expect(retrievedStats.incorrects[2].length).toBe(incorrectLength);
    expect(retrievedStats.incorrects[2][incorrectAnsNumIndex]).toEqual(NaN);
    expect(retrievedStats.incorrects[2][incorrectAnsDenIndex]).toEqual(NaN);
  });
});
