import { TimedQuiz } from '../timed-quiz';
import { FractionTimeLimitedRound } from './fraction-time-limited-round';
import { FractionRoundLevel } from './fraction-round-level';
import { Seconds } from '../seconds';
import { Stats } from '../stats';
import { FractionOperatorQuestion } from './fraction-operator-question';
import { QuizName } from '../quiz-name';
import { OPERATORS_DB_MAP } from '../constants';
import { QuestionStats } from '../question-stats';
import { QuestionSuccess } from '../question-success';

export class FractionTimedQuiz extends TimedQuiz {
  static readonly ANSWER_DELIMITER = '/';

  constructor(startingTime: Seconds, startingLevel: number, roundLevels: FractionRoundLevel[],
    quizName: QuizName, beforeStartTimer: () => void, beforeEvaluateRound: () => void,
    afterEvaluateRound: (stats: Stats) => void, showEvaluationMessages: boolean) {
      super(startingTime, startingLevel, roundLevels, quizName, beforeStartTimer,
        beforeEvaluateRound, afterEvaluateRound, showEvaluationMessages);
  }

  newRound() {
    this.currentRound = new FractionTimeLimitedRound(this.startingTime, this.roundLevels[this.currentLevel] as FractionRoundLevel);
  }

  protected finalizeQuestion(success: QuestionSuccess) {
    const question = this.currentRound.getCurrentQuestion() as FractionOperatorQuestion;
    this.questions.push(new QuestionStats(success, OPERATORS_DB_MAP.indexOf(question.operator),
      [question.operand1.numerator.value, question.operand1.denominator.value,
      question.operand2.numerator.value, question.operand2.denominator.value], this.incorrects));
  }


  protected wrongAnswer(answer: string) {
    const answers = answer.split(FractionTimedQuiz.ANSWER_DELIMITER);
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
