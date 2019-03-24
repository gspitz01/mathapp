import { Seconds } from "./seconds";
import { RoundLevel } from "./round-level";
import { TimeLimitedQuestionRound } from "./time-limited-question-round";
import { Stats } from "./stats";
import { ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT,
  NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, WRONG_ANSWER_TEXT } from "./constants";
import { QuizName } from "./quiz-name";

export abstract class TimedQuiz {
  messages: string;
  currentTime: number;
  currentLevel: number;
  currentRound: TimeLimitedQuestionRound;
  private timer: number;
  protected roundStart: Date;
  protected incorrects: number[][];

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
    readonly afterEvaluateRound: (stats: Stats) => void) {
    this.currentLevel = startingLevel;
    this.currentTime = startingTime.value;
    this.currentRound = null;
    this.timer = null;
    this.messages = "";
  }

  startTimer() {
    if (this.timer == null) {
      this.roundStart = new Date();
      this.incorrects = [];
      this.newRound();
      this.messages = "";
      this.currentTime = this.currentRound.getTimeRemaining().value;
      this.currentRound.start();
      this.beforeStartTimer();

      let that = this;
      this.timer = window.setInterval(function() {
        that.currentRound.tick();
        let timeLeft = that.currentRound.getTimeRemaining().value;
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
      this.evaluateRound();
    }
  }

  protected evaluateRound() {
    this.beforeEvaluateRound();

    let correctAnswers = this.currentRound.getNumberOfCorrectAnswers();

    let roundLevel = this.roundLevels[this.currentLevel];
    let questionThreshold = Math.floor(roundLevel.questionThresholdPerSixtySeconds * this.startingTime.value/60);
    if (correctAnswers >= questionThreshold) {
      if (this.currentLevel < this.roundLevels.length - 1) {
        this.currentLevel++;
        this.messages = ADVANCE_TO_NEXT_LEVEL_TEXT;
      } else {
        this.messages = FINISHED_HIGHEST_LEVEL_TEXT;
      }
    } else {
      this.messages = NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT;
    }

    let roundStats = new Stats(this.roundStart, new Date(), this.currentRound.level.name,
      this.currentRound.level.questionThresholdPerSixtySeconds, correctAnswers, this.incorrects);
    this.afterEvaluateRound(roundStats);
  }

  /**
   * Assign a new QuestionRound to currentRound using roundLevels and currentLevel
   */
  protected abstract newRound(): void;

  answerQuestion(answer: string) {
    if (this.timer != null) {
      if (this.currentRound.answerQuestion(answer).correct) {
        this.rightAnswer();
      } else {
        this.wrongAnswer(answer);
      }
    }
  }

  private rightAnswer() {
    this.messages = "";
  }

  /**
   * Subclasses should override this to add to incorrects, being sure to call super.wrongAnswer() at the end
   * @param answer The answer given
   */
  protected wrongAnswer(answer: string) {
    this.messages = WRONG_ANSWER_TEXT;
  }

  isTimerRunning(): boolean {
    return this.timer != null;
  }
}
