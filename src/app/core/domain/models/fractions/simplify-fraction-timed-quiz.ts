import { TimedQuiz } from '../timed-quiz';
import { SimplifyFractionRoundLevel } from './simplify-fraction-round-level';
import { Seconds } from '../seconds';
import { Stats } from '../stats';
import { SimplifyFractionTimeLimitedRound } from './simplify-fraction-time-limited-round';
import { SimplifyFractionOperatorQuestion } from './simplify-fraction-operator-question';
import { QuizName } from '../quiz-name';
import { OPERATORS_DB_MAP } from '../constants';
import { QuestionStats } from '../question-stats';
import { QuestionSuccess } from '../question-success';

export class SimplifyFractionTimedQuiz extends TimedQuiz {
  static readonly ANSWER_DELIMITER = '/';

  constructor(startingTime: Seconds, startingLevel: number, roundLevels: SimplifyFractionRoundLevel[],
    quizName: QuizName, beforeStartTimer: () => void, beforeEvaluateRound: () => void,
    afterEvaluateRound: (stats: Stats) => void, showEvaluationMessages: boolean) {
      super(startingTime, startingLevel, roundLevels, quizName, beforeStartTimer,
        beforeEvaluateRound, afterEvaluateRound, showEvaluationMessages);
  }

  newRound() {
    this.currentRound = new SimplifyFractionTimeLimitedRound(this.startingTime,
      this.roundLevels[this.currentLevel] as SimplifyFractionRoundLevel);
  }

  protected finalizeQuestion(success: QuestionSuccess) {
    const question = this.currentRound.getCurrentQuestion() as SimplifyFractionOperatorQuestion;
    this.questions.push(new QuestionStats(success, OPERATORS_DB_MAP.indexOf(question.operator),
      [question.numerator.value, question.denominator.value], this.incorrects));
  }

  protected wrongAnswer(answer: string) {
    const answers = answer.split(SimplifyFractionTimedQuiz.ANSWER_DELIMITER);
    if (answers.length !== 2 || isNaN(parseInt(answers[0], 10)) || isNaN(parseInt(answers[1], 10))) {
      this.incorrects.push(NaN);
      this.incorrects.push(NaN);
    } else {
      this.incorrects.push(parseInt(answers[0], 10));
      this.incorrects.push(parseInt(answers[0], 10));
    }
    super.wrongAnswer(answer);
  }
}
