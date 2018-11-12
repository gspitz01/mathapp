export class Stats {
  constructor(readonly roundStart: Date, readonly roundEnd: Date, readonly roundName: string,
    readonly target: number, readonly correct: number, readonly incorrects: number[][]) {}
}
