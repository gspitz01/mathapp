import { Seconds } from './seconds';
import { RoundLevel } from './round-level';
import { BasicOperatorQuestion } from './basic-operator-question';
import { AnswerEvaluation } from './answer-evaluation';

export class TimeLimitedRound {

  private started = false;
  private currentQuestion: BasicOperatorQuestion = null;
  private questionsAnswered = 0;
  private correctAnswers = 0;
  private timeRemaining: Seconds = null;

  constructor(readonly time: Seconds, readonly level: RoundLevel) {
    this.timeRemaining = new Seconds(time.value);
  }

  /**
   * Starts this round and creates the first question
   * Users of this class need to call tick() to decrease the time
   */
  start() {
    this.started = true;
    this.currentQuestion = this.level.createQuestion();
  }

  /**
   * Returns the current question
   */
  getCurrentQuestion(): BasicOperatorQuestion {
    if (this.started) {
      return this.currentQuestion;
    } else {
      return null;
    }
  }

  /**
   * Returns the amount of time remaining in the round in Seconds
   */
  getTimeRemaining(): Seconds {
    if (this.started) {
      return this.timeRemaining;
    } else {
      return this.time;
    }
  }

  answerQuestion(answer: string): AnswerEvaluation {
    if (this.started && this.timeRemaining.value > 0) {
      let correct = this.isAnswerCorrect(answer);
      if (correct) {
        this.correctAnswers++;
      }
      this.currentQuestion = this.level.createQuestion();
      this.questionsAnswered++;
      return new AnswerEvaluation(correct, this.currentQuestion.getResult());
    } else {
      return null;
    }
  }

  /**
   * If round is already started, decreases time remaining by 1
   * Otherwise does nothing
   */
  tick() {
    if (this.started && this.timeRemaining.value > 0) {
      this.timeRemaining = new Seconds(this.timeRemaining.value - 1);
    }
  }

  getNumberOfQuestionsAnswered(): number {
    return this.questionsAnswered;
  }

  getNumberOfCorrectAnswers(): number {
    return this.correctAnswers;
  }

  /**
   * Checks if an answer is correct
   * @param answer The answer provided
   */
  private isAnswerCorrect(answer: string): boolean {
    return answer === this.currentQuestion.getResult().display;
  }
}
