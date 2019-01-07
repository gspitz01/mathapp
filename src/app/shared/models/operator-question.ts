import { Result } from './result';
import { Operator } from './operator';

export interface OperatorQuestion {

  readonly operator: Operator;

  getResult(): Result;

  checkAnswer(answer: string): boolean;
}
