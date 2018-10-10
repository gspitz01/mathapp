import { FractionQuestionRound } from "./fraction-question-round";
import { Seconds } from "./seconds";
import { FractionRoundLevel } from "./fraction-round-level";
import { AnswerEvaluation } from "./answer-evaluation";

export class FractionTimeLimitedRound extends FractionQuestionRound {

  private timeRemaining: Seconds;

  constructor(readonly time: Seconds, level: FractionRoundLevel) {
    super(level);
    this.timeRemaining = new Seconds(time.value);
  }

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
