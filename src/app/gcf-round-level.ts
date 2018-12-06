import { BasicRoundLevel } from "./basic-round-level";
import { BasicOperandLimitations } from "./basic-operand-limitations";
import { BasicResultLimitations } from "./basic-result-limitations";
import { GCF } from "./basic-operators";
import { OperatorQuestion } from "./operator-question";
import { BasicOperatorQuestion } from "./basic-operator-question";
import { BasicResult } from "./basic-result";
import { BasicOperator } from "./basic-operator";

export class GcfRoundLevel extends BasicRoundLevel {

  private oneAnswersCreated: number;
  private totalAnswersCreated: number;

  /**
   *
   * @param name The name of this round
   * @param questionThresholdPerSixtySeconds How many questions to get right in 60 seconds to move to next level
   * @param operand1Limitations Limitations for the first operand
   * @param operand2Limitations Limitations for the second operand
   * @param resultLimitations Limitations for the result
   * @param percent1AnswersAllowed The percentage of answers that are allowed to be 1
   */
  constructor(name: string, questionThresholdPerSixtySeconds: number, operand1Limitations: BasicOperandLimitations,
    operand2Limitations: BasicOperandLimitations, resultLimitations: BasicResultLimitations,
    readonly percent1AnswersAllowed: number) {

    super(name, [GCF], questionThresholdPerSixtySeconds, operand1Limitations, operand2Limitations, resultLimitations);
    if (percent1AnswersAllowed > 100) {
      percent1AnswersAllowed = 100;
    } else if (percent1AnswersAllowed < 0) {
      percent1AnswersAllowed = 0;
    }
    this.oneAnswersCreated = 0;
    this.totalAnswersCreated = 0;
  }

  createQuestion(): OperatorQuestion {
    let question: BasicOperatorQuestion = null;
    let result: BasicResult
    do {
      let op1 = this.operand1Limitations.createOperand();
      let op2 = this.operand2Limitations.createOperand();
      let operator = this.chooseOperator() as BasicOperator;
      question = new BasicOperatorQuestion(op1, op2, operator);
      result = question.getResult();
    } while ((this.resultLimitations && !this.resultSatisfiesLimitations(result)) ||
        !this.answerSatisfies1Limit(result));
    this.totalAnswersCreated++;
    if (result.value === 1) {
      this.oneAnswersCreated++;
    }
    return question;
  }

  private answerSatisfies1Limit(result: BasicResult): boolean {
    if (result.value === 1 &&
      (this.oneAnswersCreated + 1) / (this.totalAnswersCreated + 1) > this.percent1AnswersAllowed / 100) {
      return false;
    }
    return true;
  }
}
