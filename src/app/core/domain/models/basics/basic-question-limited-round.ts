import { BasicRoundLevel } from './basic-round-level';
import { QuestionLimitedQuestionRound } from '../question-limited-question-round';

/**
 * A QuestionLimitedQuestionRound where from a BasicRoundLevel
 */
export class BasicQuestionLimitedRound extends QuestionLimitedQuestionRound {
  constructor(numberOfQuestions: number, level: BasicRoundLevel) {
    super(numberOfQuestions, level);
  }
}
