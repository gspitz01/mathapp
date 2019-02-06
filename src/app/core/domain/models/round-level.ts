import { Operator } from "./operator";
import { OperatorQuestion } from "./operator-question";

export abstract class RoundLevel {
  id: string;

  constructor(readonly name: string, readonly operators: Operator[],
    readonly questionThresholdPerSixtySeconds: number) {
      this.id = this.convertNameToId();
  }

  /**
   * Creates a BasicOperatorQuestion using the OperandLimitations from the level
   * Also checks that the result satisfies the ResultLimitations
   */
  abstract createQuestion(): OperatorQuestion;

  /**
   * Chooses an Operator from the options in the level
   */
  protected chooseOperator(): Operator {
    if (this.operators.length == 0) {
      return null;
    }
    let choice = Math.floor(Math.random() * this.operators.length);
    return this.operators[choice];
  }

  private convertNameToId(): string {
    return this.name.toLocaleLowerCase().replace(':', '').split(' ').join('-');
  }
}
