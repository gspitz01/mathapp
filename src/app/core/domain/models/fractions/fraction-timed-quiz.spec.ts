import { FractionTimedQuiz } from './fraction-timed-quiz';
import { Seconds } from '../seconds';
import { FRACTION_ADDITION_LEVEL_ORDER } from './fraction-round-levels';
import { FractionTimeLimitedRound } from './fraction-time-limited-round';
import { FractionOperatorQuestion } from './fraction-operator-question';
import { WRONG_ANSWER_TEXT, OPERATORS_DB_MAP, CORRECT_ANSWER_TEXT } from '../constants';
import { Stats } from '../stats';
import { FRACTION_ADDITION } from './fraction-operators';
import { QuestionSuccess } from '../question-success';
import { FractionResult } from './fraction-result';

describe('FractionTimedQuiz', () => {
  let quiz: FractionTimedQuiz;

  const startingTime = new Seconds(10);
  const startingLevel = 0;
  const spyAfterEvaluateRound = jasmine.createSpy('AfterEvaluateRound');

  // Incorrects
  const incorrectLength = 7;
  const incorrectAnsNumIndex = 5;
  const incorrectAnsDenIndex = 6;

  function answerQuestion(correctly: boolean) {
    const question = quiz.currentRound.getCurrentQuestion() as FractionOperatorQuestion;
    const result = question.getResult() as FractionResult;
    let num = result.numerator.value;
    const den = result.denominator.value;
    if (!correctly) {
      num += 1;
    }
    quiz.answerQuestion(num + FractionTimedQuiz.ANSWER_DELIMITER + den);
  }

  beforeEach(() => {
    quiz = new FractionTimedQuiz(startingTime, startingLevel, FRACTION_ADDITION_LEVEL_ORDER, 'QuizName',
      () => {}, () => {}, spyAfterEvaluateRound, true);
  });

  it('should create new FractionTimeLimitedRound', () => {
    quiz.startTimer();
    expect(quiz.currentRound).toEqual(jasmine.any(FractionTimeLimitedRound));
    expect(quiz.currentRound.time.value).toBe(startingTime.value);
    expect(quiz.currentRound.level).toBe(FRACTION_ADDITION_LEVEL_ORDER[startingLevel]);
    quiz.stopTimer();
  });

  it('should add question to stats if just stopped', () => {
    quiz.startTimer();
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();
    expect(retrievedStats.questions.length).toBe(1);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if question was answered correctly', () => {
    quiz.startTimer();
    answerQuestion(true);
    expect(quiz.messages).toBe(CORRECT_ANSWER_TEXT);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should add two questions, one for the correctly answered question,
    // and one for the unanswered question after it
    expect(retrievedStats.questions.length).toBe(2);
    const question1 = retrievedStats.questions[0];
    expect(question1.success).toBe(QuestionSuccess.Correct);
    expect(question1.operatorIndex).toBe(OPERATORS_DB_MAP.indexOf(FRACTION_ADDITION));
    expect(question1.operands.length).toBe(4);
    expect(question1.incorrects.length).toBe(0);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered incorrectly then correctly', () => {
    quiz.startTimer();
    answerQuestion(false);
    answerQuestion(true);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one eventually correct and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.EventuallyCorrect);
    expect(retrievedStats.questions[0].incorrects.length).toBe(2);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered incorrectly then stopped', () => {
    quiz.startTimer();
    answerQuestion(false);
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.questions.length).toBe(1);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.EventuallyUnsanswered);
    expect(retrievedStats.questions[0].incorrects.length).toBe(2);
  });

  it('should add question to stats if skipped', () => {
    quiz.startTimer();
    quiz.skipQuestion();
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one skipped and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.Skipped);
    expect(retrievedStats.questions[0].incorrects.length).toBe(0);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered wrong then skipped', () => {
    quiz.startTimer();
    answerQuestion(false);
    quiz.skipQuestion();
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one eventually skipped and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.EventuallySkipped);
    expect(retrievedStats.questions[0].incorrects.length).toBe(2);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered incorrectly three times', () => {
    quiz.startTimer();
    for (let i = 0; i < 3; i++) {
      answerQuestion(false);
    }
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one wrong and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.Wrong);
    expect(retrievedStats.questions[0].incorrects.length).toBe(6);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add NaN to wrongs answers if answer not a number', () => {
    quiz.startTimer();
    quiz.answerQuestion('Not a number');
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.questions.length).toBe(1);
    expect(retrievedStats.questions[0].incorrects.length).toBe(2);
    expect(retrievedStats.questions[0].incorrects[0]).toEqual(NaN);
    expect(retrievedStats.questions[0].incorrects[1]).toEqual(NaN);
  });
});
