import { BasicRoundLevel } from "./basic-round-level";
import { BasicQuestionRound } from "./basic-question-round";

export class BasicQuestionLimitedRound extends BasicQuestionRound {

  private roundFinished: boolean;

  constructor(readonly numberOfQuestions: number, level: BasicRoundLevel) {
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
