import { QuestionStats } from './question-stats';
import { QuestionSuccess } from './question-success';

export class Stats {
  constructor(readonly roundStart: Date, readonly roundEnd: Date, readonly roundName: string,
    readonly target: number, readonly questions: QuestionStats[]) {}

  calculateCorrects(): number {
    return this.calculateSuccesses(QuestionSuccess.Correct) + this.calculateSuccesses(QuestionSuccess.EventuallyCorrect);
  }

  calculateIncorrects(): number {
    return this.calculateSuccesses(QuestionSuccess.Wrong);
  }

  calculateSkips(): number {
    return this.calculateSuccesses(QuestionSuccess.Skipped) + this.calculateSuccesses(QuestionSuccess.EventuallySkipped);
  }

  calculateSuccesses(success: QuestionSuccess): number {
    if (this.questions === null) {
      return 0;
    }
    return this.questions.map(stats => stats.success).filter(qSuccess => qSuccess === success).length;
  }
}
