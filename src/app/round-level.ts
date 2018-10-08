import { Operator } from "./operator";
import { OperatorQuestion } from "./operator-question";

export abstract class RoundLevel {
  constructor(readonly name: string, readonly operators: Operator[]) {}

  /**
   * Creates a BasicOperatorQuestion using the OperandLimitations from the level
   * Also checks that the result satisfies the ResultLimitations
   */
  abstract createQuestion(): OperatorQuestion;

  /**
   * Chooses an Operator from the options in the level
   */
  protected chooseOperator(): Operator {
    let choice = Math.floor(Math.random() * this.operators.length);
    return this.operators[choice];
  }
}
