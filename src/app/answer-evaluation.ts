import { Result } from "./result";

export class AnswerEvaluation {
  constructor(readonly correct: boolean, readonly correctAnswer: Result) {}
}
