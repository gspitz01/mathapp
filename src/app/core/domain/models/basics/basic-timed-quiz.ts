import { BasicTimeLimitedRound } from './basic-time-limited-round';
import { BasicRoundLevel } from './basic-round-level';
import { TimedQuiz } from '../timed-quiz';
import { BasicOperatorQuestion } from './basic-operator-question';
import { Seconds } from '../seconds';
import { Stats } from '../stats';
import { QuizName } from '../quiz-name';
import { OPERATORS_DB_MAP } from '../constants';

/**
 * A TimedQuiz where the levels are BasicRoundLevels
 */
export class BasicTimedQuiz extends TimedQuiz {
  constructor(startingTime: Seconds, startingLevel: number, roundLevels: BasicRoundLevel[],
    quizName: QuizName, beforeStartTimer: () => void, beforeEvaluateRound: () => void,
    afterEvaluateRound: (stats: Stats) => void) {
      super(startingTime, startingLevel, roundLevels, quizName, beforeStartTimer, beforeEvaluateRound, afterEvaluateRound);
  }

  newRound() {
    this.currentRound = new BasicTimeLimitedRound(this.startingTime, this.roundLevels[this.currentLevel] as BasicRoundLevel);
  }

  protected wrongAnswer(answer: string) {
    const question = this.currentRound.getCurrentQuestion() as BasicOperatorQuestion;
    this.incorrects.push([OPERATORS_DB_MAP.indexOf(question.operator), question.operand1.value,
      question.operand2.value, parseInt(answer, 10)]);
    super.wrongAnswer(answer);
  }
}
