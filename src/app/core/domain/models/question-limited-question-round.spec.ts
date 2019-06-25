import { QuestionLimitedQuestionRound } from './question-limited-question-round';
import { RoundLevel } from './round-level';
import { OperatorQuestion } from './operator-question';
import { ADDITION } from './basics/basic-operators';
import { Operator } from './operator';
import { Result } from './result';

describe('QuestionLimitedQuestionRound', () => {
  const correctAnswerNumber = 4;

  class MockQuestionLimitedQuestionRound extends QuestionLimitedQuestionRound {}

  class MockResult implements Result {
    constructor(readonly value: number) {}
  }

  class MockOperatorQuestion implements OperatorQuestion {
    constructor(readonly operator: Operator) {}

    getResult(): Result {
      return new MockResult(correctAnswerNumber);
    }

    checkAnswer(answer: string): boolean {
      return parseInt(answer, 10) === (this.getResult() as MockResult).value;
    }
  }

  class MockRoundLevel extends RoundLevel {
    createQuestion(): OperatorQuestion {
      return new MockOperatorQuestion(this.chooseOperator());
    }
  }

  const roundLevel = new MockRoundLevel('name', [ADDITION], 10);
  let round: MockQuestionLimitedQuestionRound;

  beforeEach(() => {
    round = new MockQuestionLimitedQuestionRound(1, roundLevel);
  });

  it('should return false on isRoundFinished() before starting', () => {
    expect(round.isRoundFinished()).toBeFalsy();
  });

  it('should return false on isRoundFinished() after answering final question incorrectly', () => {
    round.start();
    round.answerQuestion('' + (correctAnswerNumber + 1));
    expect(round.isRoundFinished()).toBeFalsy();
  });

  it('should return true on isRoundFinished() after answering all questions correctly', () => {
    round.start();
    round.answerQuestion('' + correctAnswerNumber);
    expect(round.isRoundFinished()).toBeTruthy();
  });
});
