import { QuestionSuccess } from './question-success';

export class QuestionStats {
  constructor(readonly success: QuestionSuccess, readonly operatorIndex: number,
    readonly operands: number[], readonly incorrects: number[]) {}
}
