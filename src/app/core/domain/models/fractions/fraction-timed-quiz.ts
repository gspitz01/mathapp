import { TimedQuiz } from "../timed-quiz";
import { FractionTimeLimitedRound } from "./fraction-time-limited-round";
import { FractionRoundLevel } from "./fraction-round-level";
import { Seconds } from "../seconds";
import { Stats } from "../stats";
import { FractionOperatorQuestion } from "./fraction-operator-question";

export class FractionTimedQuiz extends TimedQuiz {
  static readonly ANSWER_DELIMITER = "/";

  constructor(startingTime: Seconds, startingLevel: number, roundLevels: FractionRoundLevel[],
    quizName: string, beforeStartTimer: () => void, beforeEvaluateRound: () => void,
    afterEvaluateRound: (stats: Stats) => void) {
      super(startingTime, startingLevel, roundLevels, quizName, beforeStartTimer, beforeEvaluateRound, afterEvaluateRound);
  }

  newRound() {
    this.currentRound = new FractionTimeLimitedRound(this.startingTime, this.roundLevels[this.currentLevel] as FractionRoundLevel);
  }

  protected wrongAnswer(answer: string) {
    let question = this.currentRound.getCurrentQuestion() as FractionOperatorQuestion;
    let answers = answer.split(FractionTimedQuiz.ANSWER_DELIMITER);
    if (answers.length != 2 || isNaN(parseInt(answers[0])) || isNaN(parseInt(answers[1]))) {
      this.incorrects.push([question.operand1.numerator.value, question.operand1.denominator.value,
        question.operand2.numerator.value, question.operand2.denominator.value, NaN, NaN]);
    } else {
      this.incorrects.push([question.operand1.numerator.value, question.operand1.denominator.value,
        question.operand2.numerator.value, question.operand2.denominator.value, parseInt(answers[0]),
        parseInt(answers[1])]);
    }
    super.wrongAnswer(answer);
  }
}
