import { Seconds } from "../../../shared/models/seconds";
import { AnswerEvaluation } from "../../../shared/models/answer-evaluation";
import { SimplifyFractionQuestionRound } from "./simplify-fraction-question-round";
import { SimplifyFractionRoundLevel } from "./simplify-fraction-round-level";

export class SimplifyFractionTimeLimitedRound extends SimplifyFractionQuestionRound {
  private timeRemaining: Seconds;

  constructor(readonly time: Seconds, level: SimplifyFractionRoundLevel) {
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
