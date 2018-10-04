import { RoundLevel } from "./round-level";
import { QuestionRound } from "./question-round";

export class QuestionLimitedRound extends QuestionRound {

  private roundFinished: boolean;

  constructor(readonly numberOfQuestions: number, level: RoundLevel) {
    super(level);
    this.roundFinished = false;
  }

  /**
   * This gets called from within answerQuestion() of the super class
   */
  shouldCreateNewQuestion(): boolean {
    if (this.getNumberOfQuestionsAnswered() < this.numberOfQuestions) {
      return true;
    } else {
      this.roundFinished = true;
      return false;
    }
  }

  isRoundFinished(): boolean {
    return this.roundFinished;
  }
}
