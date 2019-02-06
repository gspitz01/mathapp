import { QuestionRound } from "./question-round";
import { Seconds } from "./seconds";
import { RoundLevel } from "./round-level";
import { AnswerEvaluation } from "./answer-evaluation";

/**
 * Users of subclasses of this class need to call tick() to decrease the time after calling start()
 */
export abstract class TimeLimitedQuestionRound extends QuestionRound {
  private timeRemaining: Seconds;

  constructor(readonly time: Seconds, level: RoundLevel) {
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
