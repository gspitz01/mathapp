import { TimedQuiz } from '../timed-quiz';
import { FractionTimeLimitedRound } from './fraction-time-limited-round';
import { FractionRoundLevel } from './fraction-round-level';
import { Seconds } from '../seconds';
import { Stats } from '../stats';
import { FractionOperatorQuestion } from './fraction-operator-question';
import { QuizName } from '../quiz-name';

export class FractionTimedQuiz extends TimedQuiz {
  static readonly ANSWER_DELIMITER = '/';

  constructor(startingTime: Seconds, startingLevel: number, roundLevels: FractionRoundLevel[],
    quizName: QuizName, beforeStartTimer: () => void, beforeEvaluateRound: () => void,
    afterEvaluateRound: (stats: Stats) => void) {
      super(startingTime, startingLevel, roundLevels, quizName, beforeStartTimer, beforeEvaluateRound, afterEvaluateRound);
  }

  newRound() {
    this.currentRound = new FractionTimeLimitedRound(this.startingTime, this.roundLevels[this.currentLevel] as FractionRoundLevel);
  }

  protected wrongAnswer(answer: string) {
    const question = this.currentRound.getCurrentQuestion() as FractionOperatorQuestion;
    const answers = answer.split(FractionTimedQuiz.ANSWER_DELIMITER);
    if (answers.length !== 2 || isNaN(parseInt(answers[0], 10)) || isNaN(parseInt(answers[1], 10))) {
      this.incorrects.push([question.operand1.numerator.value, question.operand1.denominator.value,
        question.operand2.numerator.value, question.operand2.denominator.value, NaN, NaN]);
    } else {
      this.incorrects.push([question.operand1.numerator.value, question.operand1.denominator.value,
        question.operand2.numerator.value, question.operand2.denominator.value, parseInt(answers[0], 10),
        parseInt(answers[1], 10)]);
    }
    super.wrongAnswer(answer);
  }
}
