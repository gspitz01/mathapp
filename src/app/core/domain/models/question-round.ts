import { RoundLevel } from "./round-level";
import { OperatorQuestion } from "./operator-question";
import { AnswerEvaluation } from "./answer-evaluation";

export abstract class QuestionRound {

  protected currentQuestion: OperatorQuestion;
  private questionsAnswered: number;
  private wrongAnswers: number;
  private sameQuestion: boolean;

  constructor(readonly level: RoundLevel) {
    this.currentQuestion = null;
    this.questionsAnswered = 0;
    this.wrongAnswers = 0;
    this.sameQuestion = false;
  }

  start() {
    this.currentQuestion = this.level.createQuestion();
  }

  /**
   * Returns the current question
   */
  getCurrentQuestion(): OperatorQuestion {
    return this.currentQuestion;
  }

  getNumberOfQuestionsAnswered(): number {
    return this.questionsAnswered;
  }

  getNumberOfCorrectAnswers(): number {
    if (this.sameQuestion) {
      return this.questionsAnswered - 1;
    } else {
      return this.questionsAnswered;
    }
  }

  getNumberOfWrongAnswers(): number {
    return this.wrongAnswers;
  }

  answerQuestion(answer: string): AnswerEvaluation {
    if (this.currentQuestion != null) {
      if (!this.sameQuestion) {
        this.questionsAnswered++;
      }
      let correct = this.isAnswerCorrect(answer);
      if (correct) {
        if (this.shouldCreateNewQuestion()) {
          this.currentQuestion = this.level.createQuestion();
          this.sameQuestion = false;
        }
      } else {
        this.wrongAnswers++;
        this.sameQuestion = true;
      }
      return new AnswerEvaluation(correct, this.currentQuestion.getResult());
    } else {
      return null;
    }
  }

  /**
   * This is a useful method for subclasses to override if they want to limit the number of questions
   */
  protected shouldCreateNewQuestion(): boolean {
    return true;
  }

  /**
   * Checks if an answer is correct
   * @param answer The answer provided
   */
  private isAnswerCorrect(answer: string): boolean {
    return this.currentQuestion.checkAnswer(answer);
  }
}
