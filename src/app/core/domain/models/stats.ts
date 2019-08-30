import { QuestionStats } from './question-stats';

export class Stats {
  constructor(readonly roundStart: Date, readonly roundEnd: Date, readonly roundName: string,
    readonly target: number, readonly questions: QuestionStats[]) {}
}
