import { QuestionRound } from './question-round';
import { RoundLevel } from './round-level';

/**
 * A QuestionRound where a certain number of questions must be answered
 */
export abstract class QuestionLimitedQuestionRound extends QuestionRound {
  private roundFinished: boolean;

  constructor(readonly numberOfQuestions: number, level: RoundLevel) {
    super(level);
    this.roundFinished = false;
  }

  /**
   * This gets called from within answerQuestion() of the super class
   */
  protected shouldCreateNewQuestion(): boolean {
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
