import { RoundLevel } from "./round-level";
import { OperatorQuestion } from "./operator-question";
import { AnswerEvaluation } from "./answer-evaluation";

export abstract class QuestionRound {

  protected currentQuestion: OperatorQuestion;
  private questionsAnswered: number;
  private correctAnswers: number;

  constructor(readonly level: RoundLevel) {
    this.currentQuestion = null;
    this.questionsAnswered = 0;
    this.correctAnswers = 0;
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
    return this.correctAnswers;
  }

  answerQuestion(answer: string): AnswerEvaluation {
    if (this.currentQuestion != null) {
      let correct = this.isAnswerCorrect(answer);
      if (correct) {
        this.correctAnswers++;
      }
      this.questionsAnswered++;
      if (this.shouldCreateNewQuestion()) {
        this.currentQuestion = this.level.createQuestion();
      }
      return new AnswerEvaluation(correct, this.currentQuestion.getResult());
    } else {
      return null;
    }
  }

  /**
   * This is a useful method for subclasses to override if they want to limit the number of questions
   */
  shouldCreateNewQuestion(): boolean {
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
