import { Seconds } from '../seconds';
import { BasicRoundLevel } from './basic-round-level';
import { AnswerEvaluation } from '../answer-evaluation';
import { BasicQuestionRound } from './basic-question-round';

/**
 * Users of this class need to call tick() to decrease the time after calling start()
 */
export class BasicTimeLimitedRound extends BasicQuestionRound {

  private timeRemaining: Seconds = null;

  constructor(readonly time: Seconds, level: BasicRoundLevel) {
    super(level);
    this.timeRemaining = new Seconds(time.value);
  }

  /**
   * Returns the amount of time remaining in the round in Seconds
   */
  getTimeRemaining(): Seconds {
    return this.timeRemaining;
  }

  answerQuestion(answer: string): AnswerEvaluation {
    if (this.timeRemaining.value > 0) {
      return super.answerQuestion(answer);
    } else {
      return null;
    }
  }

  /**
   * If round is already started, decreases time remaining by 1
   * Otherwise does nothing
   */
  tick() {
    if (this.currentQuestion != null && this.timeRemaining.value > 0) {
      this.timeRemaining = new Seconds(this.timeRemaining.value - 1);
    }
  }
}
