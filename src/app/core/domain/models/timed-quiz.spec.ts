import { TimedQuiz } from './timed-quiz';
import { Seconds } from './seconds';
import { RoundLevel } from './round-level';
import { OperatorQuestion } from './operator-question';
import { ADDITION, SUBTRACTION } from './basics/basic-operators';
import { Stats } from './stats';
import { NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, ADVANCE_TO_NEXT_LEVEL_TEXT,
  FINISHED_HIGHEST_LEVEL_TEXT, WRONG_ANSWER_TEXT, CORRECT_ANSWER_TEXT } from './constants';
import { QuestionSuccess } from './question-success';
import { QuestionStats } from './question-stats';

describe('TimedQuiz', () => {
  // Need to add level property
  let spyQuestionRound, spyBeforeStartTimer, spyBeforeEvaluateRound, spyAfterEvaluateRound;
  let quiz: MockTimedQuiz;
  const startingTime = new Seconds(10);
  const startingLevel = 0;

  class MockTimedQuiz extends TimedQuiz {
    newRound(): void {
      this.currentRound = spyQuestionRound;
    }

    protected finalizeQuestion(success: QuestionSuccess) {
      this.questions.push(new QuestionStats(success, 0, [0], []));
    }
  }

  class MockRoundLevel extends RoundLevel {
    createQuestion(): OperatorQuestion {
      return null;
    }
  }

  function checkTimerStarted() {
    expect(spyQuestionRound.getTimeRemaining).toHaveBeenCalled();
    expect(spyQuestionRound.start).toHaveBeenCalled();
    expect(quiz.messages).toBe('');
    expect(quiz.currentTime).toBe(startingTime.value);
    expect(quiz.currentLevel).toBe(startingLevel);
    expect(quiz.currentRound).toBe(spyQuestionRound);
    expect(spyBeforeStartTimer).toHaveBeenCalled();
    expect(spyQuestionRound.tick).not.toHaveBeenCalled();
    expect(quiz.isTimerRunning()).toBeTruthy();
  }

  const roundLevels = [new MockRoundLevel('level 1', [ADDITION], 10), new MockRoundLevel('level 2', [SUBTRACTION], 6)];

  beforeEach(() => {
    spyQuestionRound = jasmine.createSpyObj('QuestionRound',
    ['start', 'getTimeRemaining', 'tick', 'getNumberOfCorrectAnswers', 'answerQuestion']);
    spyBeforeStartTimer = jasmine.createSpy('BeforeStartTimer');
    spyBeforeEvaluateRound = jasmine.createSpy('BeforeEvaluateRound');
    spyAfterEvaluateRound = jasmine.createSpy('AfterEvaluateRound');
    quiz = new MockTimedQuiz(startingTime, startingLevel, roundLevels, 'Mock Quiz',
      spyBeforeStartTimer, spyBeforeEvaluateRound, spyAfterEvaluateRound);
    // Make sure timeRemaining counts down properly when spyQuestionRound.tick() is called
    let timeRemaining = startingTime.value;
    spyQuestionRound.tick.and.callFake(() => {
      if (timeRemaining > 0) {
        timeRemaining -= 1;
      }
    });
    spyQuestionRound.getTimeRemaining.and.callFake(() => ({ value: timeRemaining}));
    Object.defineProperty(spyQuestionRound, 'level',
      { get: function() { return roundLevels[0]; }});
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should start quiz on startTimer()', () => {
    quiz.startTimer();
    checkTimerStarted();

    // Tick off the first 1000 seconds
    jasmine.clock().tick(1001);
    expect(spyQuestionRound.tick).toHaveBeenCalled();
    expect(quiz.currentTime).toBe(startingTime.value - 1);
    expect(spyBeforeEvaluateRound).not.toHaveBeenCalled();

    // Tick off all the rest of the time
    jasmine.clock().tick(9000);
    expect(spyQuestionRound.tick).toHaveBeenCalledTimes(10);
    expect(quiz.currentTime).toBe(0);
    expect(spyBeforeEvaluateRound).toHaveBeenCalled();
    expect(spyQuestionRound.getNumberOfCorrectAnswers).toHaveBeenCalled();
    expect(spyAfterEvaluateRound).toHaveBeenCalledWith(jasmine.any(Stats));
    // Should not have answered enough questions
    expect(quiz.messages).toBe(NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT);
    expect(quiz.isTimerRunning()).toBeFalsy();
  });

  it('should do nothing on startTimer() if already started', () => {
    quiz.startTimer();
    checkTimerStarted();

    quiz.startTimer();
    // Make sure spyQuestionRound.start() has not been called again
    expect(spyQuestionRound.start).toHaveBeenCalledTimes(1);
    quiz.stopTimer();
  });

  it('should stop quiz on stopTimer()', () => {
    quiz.startTimer();
    quiz.stopTimer();

    expect(spyBeforeEvaluateRound).toHaveBeenCalled();
    expect(spyQuestionRound.getNumberOfCorrectAnswers).toHaveBeenCalled();
    expect(spyAfterEvaluateRound).toHaveBeenCalledWith(jasmine.any(Stats));
    // Should not have answered enough questions
    expect(quiz.messages).toBe(NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT);
    expect(quiz.isTimerRunning()).toBeFalsy();
  });

  it('should do nothing on stopTimer() if not started', () => {
    quiz.stopTimer();

    expect(spyBeforeEvaluateRound).not.toHaveBeenCalled();
    expect(spyQuestionRound.getNumberOfCorrectAnswers).not.toHaveBeenCalled();
    expect(spyAfterEvaluateRound).not.toHaveBeenCalled();
    expect(quiz.messages).toBe('');
  });

  it('should increase level and change messages when enough questions answered', () => {
    spyQuestionRound.getNumberOfCorrectAnswers.and.returnValue(roundLevels[0].questionThresholdPerSixtySeconds);
    quiz.startTimer();
    checkTimerStarted();
    quiz.stopTimer();

    expect(quiz.messages).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);
    expect(quiz.currentLevel).toBe(startingLevel + 1);
  });

  it('should set messages to highest level message when finished highest level', () => {
    for (let i = 0; i < roundLevels.length; i++) {
      spyQuestionRound.getNumberOfCorrectAnswers.and.returnValue(roundLevels[i].questionThresholdPerSixtySeconds);
      quiz.startTimer();
      quiz.stopTimer();
    }

    expect(quiz.messages).toBe(FINISHED_HIGHEST_LEVEL_TEXT);
    expect(quiz.currentLevel).toBe(roundLevels.length - 1);
  });

  it('should call answerQuestion() on round on answerQuestion()', () => {
    quiz.startTimer();
    spyQuestionRound.answerQuestion.and.returnValue({correct: true});
    const answer = 'Whatever';
    quiz.answerQuestion(answer);
    expect(spyQuestionRound.answerQuestion).toHaveBeenCalledWith(answer);
    quiz.stopTimer();
  });

  it('should do nothing on answerQuestion() if round not started', () => {
    quiz.answerQuestion('anything');
    expect(spyQuestionRound.answerQuestion).not.toHaveBeenCalled();
  });

  it('incorrect answer sets incorrect message', () => {
    quiz.startTimer();
    spyQuestionRound.answerQuestion.and.returnValue({correct: false});
    quiz.answerQuestion('anything');
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);
    quiz.stopTimer();
  });

  it('correct answer sets messages to correct answer text', () => {
    quiz.startTimer();
    spyQuestionRound.answerQuestion.and.returnValue({correct: false});
    quiz.answerQuestion('anything');
    expect(quiz.messages).toBe(WRONG_ANSWER_TEXT);

    spyQuestionRound.answerQuestion.and.returnValue({correct: true});
    quiz.answerQuestion('anythingAgain');
    expect(quiz.messages).toBe(CORRECT_ANSWER_TEXT);
    quiz.stopTimer();
  });

  it('should call afterEvaluateRound with correct stats', () => {
    const questionsAnswered = 7;
    spyQuestionRound.getNumberOfCorrectAnswers.and.returnValue(questionsAnswered);
    let retrievedStats: Stats;
    spyAfterEvaluateRound.and.callFake((stats: Stats) => {
      retrievedStats = stats;
    });

    quiz.startTimer();
    quiz.stopTimer();

    expect(retrievedStats.roundName).toBe(roundLevels[0].name);
    expect(retrievedStats.target).toBe(roundLevels[0].questionThresholdPerSixtySeconds);
    expect(retrievedStats.roundStart).toEqual(jasmine.any(Date));
    expect(retrievedStats.roundEnd).toEqual(jasmine.any(Date));
    expect(retrievedStats.questions.length).toBe(1);
  });
});
