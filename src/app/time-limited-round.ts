import { Seconds } from './seconds';
import { RoundLevel } from './round-level';
import { BasicOperatorQuestion } from './basic-operator-question';
import { AnswerEvaluation } from './answer-evaluation';
import { Operand } from './operand';
import { OperandLimitations } from './operand-limitations';
import { Result } from './result';
import { Operator } from './operator';

export class TimeLimitedRound {

  private started = false;
  private currentQuestion: BasicOperatorQuestion = null;
  private questionsAnswered = 0;
  private correctAnswers = 0;
  private timeRemaining: Seconds = null;

  constructor(readonly time: Seconds, readonly level: RoundLevel) {
    this.timeRemaining = new Seconds(time.value);
  }

  /**
   * Starts this round and creates the first question
   * Users of this class need to call tick() to decrease the time
   */
  start() {
    this.started = true;
    this.currentQuestion = this.createQuestion();
  }

  /**
   * Returns the current question
   */
  getCurrentQuestion(): BasicOperatorQuestion {
    if (this.started) {
      return this.currentQuestion;
    } else {
      return null;
    }
  }

  /**
   * Returns the amount of time remaining in the round in Seconds
   */
  getTimeRemaining(): Seconds {
    if (this.started) {
      return this.timeRemaining;
    } else {
      return this.time;
    }
  }

  answerQuestion(answer: string): AnswerEvaluation {
    if (this.started && this.timeRemaining.value > 0) {
      let correct = this.isAnswerCorrect(answer);
      if (correct) {
        this.correctAnswers++;
      }
      this.currentQuestion = this.createQuestion();
      this.questionsAnswered++;
      return new AnswerEvaluation(correct, this.currentQuestion.getResult());
    } else {
      return null;
    }
  }

  /**
   * If round is already started, decreases time remaining by 1
   * Otherwise does nothing
   */
  tick() {
    if (this.started && this.timeRemaining.value > 0) {
      this.timeRemaining = new Seconds(this.timeRemaining.value - 1);
    }
  }

  getNumberOfQuestionsAnswered(): number {
    return this.questionsAnswered;
  }

  getNumberOfCorrectAnswers(): number {
    return this.correctAnswers;
  }

  /**
   * Creates a BasicOperatorQuestion using the OperandLimitations from the level
   * Also checks that the result satisfies the ResultLimitations
   */
  private createQuestion(): BasicOperatorQuestion {
    var question: BasicOperatorQuestion = null;
    var result: Result = null;
    do {
      let op1 = this.createOperand(this.level.operand1Limitations);
      let op2 = this.createOperand(this.level.operand2Limitations);
      let operator = this.chooseOperator();
      question = new BasicOperatorQuestion(op1, op2, operator);
      result = question.getResult();
    } while (!this.resultSatisfiesLimitations(result));
    return question;
  }

  /**
   * Creates an operand for the question to be asked
   * @param limitations The limitations for the Operand to be created
   */
  private createOperand(limitations: OperandLimitations): Operand {
    var value = Math.random() * 10**limitations.numberOfDigits;
    if (limitations.wholeNumber) {
      value = Math.floor(value);
    }
    if (limitations.possiblyNegative) {
      var multNeg = Math.random();
      if (multNeg > 0.5) {
        value = value * -1;
      }
    }
    return new Operand(""+value, value);
  }

  /**
   * Checks a question result to make sure it satisfies ResultLimitations
   * @param result The Result to be checked against
   */
  private resultSatisfiesLimitations(result: Result): boolean {
    if (result === null) {
      return false;
    } else {
      if (this.level.resultLimitations === null) {
        return true;
      }
      if ((!this.level.resultLimitations.possiblyNegative && result.value < 0) ||
          (this.level.resultLimitations.wholeNumber && !Number.isInteger(result.value))) {
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * Chooses an Operator from the options in the level
   */
  private chooseOperator(): Operator {
    let choice = Math.floor(Math.random() * this.level.operators.length);
    return this.level.operators[choice];
  }

  /**
   * Checks if an answer is correct
   * @param answer The answer provided
   */
  private isAnswerCorrect(answer: string): boolean {
    return answer === this.currentQuestion.getResult().display;
  }
}
