import { Seconds } from './seconds';
import { RoundLevel } from './round-level';
import { TimeLimitedQuestionRound } from './time-limited-question-round';
import { Stats } from './stats';
import { ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT,
  NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, WRONG_ANSWER_TEXT, TOO_MANY_WRONG_TEXT, SKIPPED_TEXT, CORRECT_ANSWER_TEXT } from './constants';
import { QuizName } from './quiz-name';
import { QuestionStats } from './question-stats';
import { QuestionSuccess } from './question-success';
import { QuestionFinalizationReason } from './question-finalization-reason';

export abstract class TimedQuiz {

  static readonly SUCCESSIVELY_INCORRECT_LIMIT = 3;

  messages: string;
  currentTime: number;
  currentLevel: number;
  currentRound: TimeLimitedQuestionRound;
  private timer: number;
  private successivelyIncorrect: number;
  protected roundStart: Date;
  protected questions: QuestionStats[];
  protected incorrects: number[];

  /**
   *
   * @param startingTime The amount of time in Seconds given for each round
   * @param startingLevel The first level
   * @param roundLevels All of the levels
   * @param quizName The name of the quiz
   * @param beforeStartTimer A function to be called right before the timer is started
   * @param beforeEvaluateRound A function to be called right before the round is evaluated
   * @param afterEvaluateRound A function to be called after the round is evaluated, this function accepts a Stats
   */
  constructor(readonly startingTime: Seconds, startingLevel: number, readonly roundLevels: RoundLevel[],
    readonly quizName: QuizName, readonly beforeStartTimer: () => void, readonly beforeEvaluateRound: () => void,
    readonly afterEvaluateRound: (stats: Stats) => void, readonly showEvaluationMessages: boolean) {
    this.currentLevel = startingLevel;
    this.currentTime = startingTime.value;
    this.currentRound = null;
    this.timer = null;
    this.messages = '';
  }

  startTimer() {
    if (this.timer == null) {
      this.roundStart = new Date();
      this.questions = [];
      this.incorrects = [];
      this.successivelyIncorrect = 0;
      this.newRound();
      this.messages = '';
      this.currentTime = this.currentRound.getTimeRemaining().value;
      this.currentRound.start();
      this.beforeStartTimer();

      const that = this;
      this.timer = window.setInterval(function() {
        that.currentRound.tick();
        const timeLeft = that.currentRound.getTimeRemaining().value;
        that.currentTime = timeLeft;
        if (timeLeft <= 0) {
          window.clearInterval(that.timer);
          that.timer = null;
          that.evaluateRound();
        }
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timer != null) {
      window.clearInterval(this.timer);
      this.timer = null;
      this.finalizeQuestion(this.getQuestionSuccess(QuestionFinalizationReason.TimerStopped));
      this.evaluateRound();
    }
  }

  protected evaluateRound() {
    this.beforeEvaluateRound();

    const correctAnswers = this.currentRound.getNumberOfCorrectAnswers();

    const roundLevel = this.roundLevels[this.currentLevel];
    const questionThreshold = Math.floor(roundLevel.questionThresholdPerSixtySeconds * this.startingTime.value / 60);
    if (correctAnswers >= questionThreshold) {
      if (this.currentLevel < this.roundLevels.length - 1) {
        this.currentLevel++;
        if (this.showEvaluationMessages) {
          this.messages = ADVANCE_TO_NEXT_LEVEL_TEXT;
        }
      } else if (this.showEvaluationMessages) {
        this.messages = FINISHED_HIGHEST_LEVEL_TEXT;
      }
    } else if (this.showEvaluationMessages) {
      this.messages = NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT;
    }

    const roundStats = new Stats(this.roundStart, new Date(), this.currentRound.level.name,
      this.currentRound.level.questionThresholdPerSixtySeconds, this.questions);
    this.afterEvaluateRound(roundStats);
  }

  /**
   * Assign a new QuestionRound to currentRound using roundLevels and currentLevel
   */
  protected abstract newRound(): void;

  /**
   * Attempts to answer a question with a string
   * @param answer The answer given for the question
   */
  answerQuestion(answer: string) {
    if (this.timer != null) {
      if (this.currentRound.answerQuestion(answer).correct) {
        this.finalizeQuestion(this.getQuestionSuccess(QuestionFinalizationReason.Correct));
        this.rightAnswer();
      } else {
        this.wrongAnswer(answer);
      }
    }
  }

  /**
   * When a question is completed either by skipping or by getting it right
   * Currently being wrong too many times isn't enough to finish a question
   */
  protected abstract finalizeQuestion(success: QuestionSuccess): void;

  skipQuestion() {
    if (this.timer != null) {
      this.currentRound.skipQuestion();
      this.finalizeQuestion(this.getQuestionSuccess(QuestionFinalizationReason.Skipped));
      this.messages = SKIPPED_TEXT;
      this.resetIncorrects();
    }
  }

  private rightAnswer() {
    this.messages = CORRECT_ANSWER_TEXT;
    this.resetIncorrects();
  }

  /**
   * Subclasses should override this to add to incorrects, being sure to call super.wrongAnswer() at the end
   * @param answer The answer given
   */
  protected wrongAnswer(answer: string) {
    this.messages = WRONG_ANSWER_TEXT;
    this.successivelyIncorrect++;
    if (this.successivelyIncorrect >= TimedQuiz.SUCCESSIVELY_INCORRECT_LIMIT) {
      if (this.timer != null) {
        this.currentRound.skipQuestion();
        this.finalizeQuestion(this.getQuestionSuccess(QuestionFinalizationReason.Wrong));
      }
      this.messages = TOO_MANY_WRONG_TEXT;
      this.resetIncorrects();
    }
  }

  private resetIncorrects() {
    this.successivelyIncorrect = 0;
    this.incorrects = [];
  }

  isTimerRunning(): boolean {
    return this.timer != null;
  }

  getQuestionSuccess(reason: QuestionFinalizationReason): QuestionSuccess {
    switch (reason) {
      case QuestionFinalizationReason.Correct:
        if (this.incorrects.length > 0) {
          return QuestionSuccess.EventuallyCorrect;
        } else {
          return QuestionSuccess.Correct;
        }
      case QuestionFinalizationReason.Skipped:
        if (this.incorrects.length > 0) {
          return QuestionSuccess.EventuallySkipped;
        } else {
          return QuestionSuccess.Skipped;
        }
      case QuestionFinalizationReason.TimerStopped:
        if (this.incorrects.length > 0) {
          return QuestionSuccess.EventuallyUnsanswered;
        } else {
          return QuestionSuccess.Unanswered;
        }
      case QuestionFinalizationReason.Wrong:
        return QuestionSuccess.Wrong;
    }
  }
}
