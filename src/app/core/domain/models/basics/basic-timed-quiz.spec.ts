import { BasicTimedQuiz } from './basic-timed-quiz';
import { Seconds } from '../seconds';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from './basic-multiplication-round-levels';
import { BasicTimeLimitedRound } from './basic-time-limited-round';
import { BasicResult } from './basic-result';
import { Stats } from '../stats';
import { BasicOperatorQuestion } from './basic-operator-question';
import { WRONG_ANSWER_TEXT, OPERATORS_DB_MAP, CORRECT_ANSWER_TEXT } from '../constants';
import { MULTIPLICATION } from './basic-operators';
import { QuestionSuccess } from '../question-success';

describe('BasicTimedQuiz', () => {
  let quiz: BasicTimedQuiz;

  const startingTime = new Seconds(10);
  const startingLevel = 0;
  const spyAfterEvaluateRound = jasmine.createSpy('AfterEvaluateRound');

  beforeEach(() => {
    quiz = new BasicTimedQuiz(startingTime, startingLevel, BASIC_MULTIPLICATION_LEVEL_ORDER[0],
      'Multi', () => {}, () => {}, spyAfterEvaluateRound);
  });

  it('should create new round of BasicTimeLimitedRound', () => {
    quiz.startTimer();
    expect(quiz.currentRound).toEqual(jasmine.any(BasicTimeLimitedRound));
    expect(quiz.currentRound.time.value).toBe(startingTime.value);
    expect(quiz.currentRound.level).toBe(BASIC_MULTIPLICATION_LEVEL_ORDER[0][startingLevel]);
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
    const question = quiz.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    quiz.answerQuestion('' + (question.getResult() as BasicResult).value);
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
    expect(question1.operatorIndex).toBe(OPERATORS_DB_MAP.indexOf(MULTIPLICATION));
    expect(question1.operands.length).toBe(2);
    expect(question1.incorrects.length).toBe(0);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered incorrectly then correctly', () => {
    quiz.startTimer();
    const question = quiz.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    const answer = (question.getResult() as BasicResult).value;
    quiz.answerQuestion('' + answer + 1);
    quiz.answerQuestion('' + answer);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one eventually correct and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.EventuallyCorrect);
    expect(retrievedStats.questions[0].incorrects.length).toBe(1);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered incorrectly then stopped', () => {
    quiz.startTimer();
    const question = quiz.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    quiz.answerQuestion('' + (question.getResult() as BasicResult).value + 1);
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    expect(retrievedStats.questions.length).toBe(1);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.EventuallyUnsanswered);
    expect(retrievedStats.questions[0].incorrects.length).toBe(1);
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
    const question = quiz.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    quiz.answerQuestion('' + (question.getResult() as BasicResult).value + 1);
    quiz.skipQuestion();
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one eventually skipped and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.EventuallySkipped);
    expect(retrievedStats.questions[0].incorrects.length).toBe(1);
    expect(retrievedStats.questions[1].success).toBe(QuestionSuccess.Unanswered);
  });

  it('should add question to stats if answered incorrectly three times', () => {
    quiz.startTimer();
    const question = quiz.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    for (let i = 0; i < 3; i++) {
      quiz.answerQuestion('' + (question.getResult() as BasicResult).value + 1);
    }
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });
    quiz.stopTimer();

    // Should be two: one wrong and one unanswered
    expect(retrievedStats.questions.length).toBe(2);
    expect(retrievedStats.questions[0].success).toBe(QuestionSuccess.Wrong);
    expect(retrievedStats.questions[0].incorrects.length).toBe(3);
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
    expect(retrievedStats.questions[0].incorrects.length).toBe(1);
    expect(retrievedStats.questions[0].incorrects[0]).toEqual(NaN);
  });
});
