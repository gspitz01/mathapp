import { TimedQuiz } from "../timed-quiz";
import { SimplifyFractionRoundLevel } from "./simplify-fraction-round-level";
import { Seconds } from "../seconds";
import { Stats } from "../stats";
import { SimplifyFractionTimeLimitedRound } from "./simplify-fraction-time-limited-round";
import { SimplifyFractionOperatorQuestion } from "./simplify-fraction-operator-question";
import { QuizName } from "../quiz-name";

export class SimplifyFractionTimedQuiz extends TimedQuiz {
  static readonly ANSWER_DELIMITER = "/";

  constructor(startingTime: Seconds, startingLevel: number, roundLevels: SimplifyFractionRoundLevel[],
    quizName: QuizName, beforeStartTimer: () => void, beforeEvaluateRound: () => void,
    afterEvaluateRound: (stats: Stats) => void) {
      super(startingTime, startingLevel, roundLevels, quizName, beforeStartTimer, beforeEvaluateRound, afterEvaluateRound);
  }

  newRound() {
    this.currentRound = new SimplifyFractionTimeLimitedRound(this.startingTime,
      this.roundLevels[this.currentLevel] as SimplifyFractionRoundLevel);
  }

  protected wrongAnswer(answer: string) {
    let question = this.currentRound.getCurrentQuestion() as SimplifyFractionOperatorQuestion;
    let answers = answer.split(SimplifyFractionTimedQuiz.ANSWER_DELIMITER);
    if (answers.length != 2 || isNaN(parseInt(answers[0])) || isNaN(parseInt(answers[1]))) {
      // Zero at end of this array is just an indicator that this is a Simplify Fractions answer,
      // to differentiate between a Fractions answer without the guess
      this.incorrects.push([question.numerator.value, question.denominator.value, NaN,
        NaN, 0]);
    } else {
      // Zero at end of this array is just an indicator that this is a Simplify Fractions answer,
      // to differentiate between a Fractions answer without the guess
      this.incorrects.push([question.numerator.value, question.denominator.value, parseInt(answers[0]),
        parseInt(answers[1]), 0]);
    }
    super.wrongAnswer(answer);
  }
}
