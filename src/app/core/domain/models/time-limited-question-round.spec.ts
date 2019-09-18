import { TimeLimitedQuestionRound } from './time-limited-question-round';
import { Seconds } from './seconds';
import { RoundLevel } from './round-level';
import { OperatorQuestion } from './operator-question';
import { ADDITION } from './basics/basic-operators';
import { Result } from './result';
import { Operator } from './operator';

describe('TimeLimitedQuestionRound', () => {
  class MockTimeLimitedQuestionRound extends TimeLimitedQuestionRound {

  }

  class MockOperatorQuestion implements OperatorQuestion {
    constructor(readonly operator: Operator) {}

    getResult(): Result {
      return null;
    }

    checkAnswer(answer: string): boolean {
      return false;
    }
  }

  class MockRoundLevel extends RoundLevel {
    createQuestion(): OperatorQuestion {
      return new MockOperatorQuestion(this.chooseOperator());
    }
  }

  const initialTime = new Seconds(60);
  const level = new MockRoundLevel('roundName', [ADDITION], 20, 10);
  let round: TimeLimitedQuestionRound;

  beforeEach(() => {
    round = new MockTimeLimitedQuestionRound(initialTime, level);
  });


  it('should return same value as initial time before calling tick()', () => {
    expect(round.getTimeRemaining().value).toBe(initialTime.value);
  });

  it('should tick off time if already started', () => {
    round.start();
    round.tick();
    expect(round.getTimeRemaining().value).toBe(initialTime.value - 1);
  });

  it('should not tick off time if not started', () => {
    round.tick();
    expect(round.getTimeRemaining().value).toBe(initialTime.value);
  });

  it('should not tick off time if time already 0', () => {
    round.start();
    for (; round.getTimeRemaining().value > 0; round.tick()) {}
    expect(round.getTimeRemaining().value).toBe(0);
    round.tick();
    expect(round.getTimeRemaining().value).toBe(0);
  });

  it('should return an answerEvaluation if still time remaining on answerQuestion()', () => {
    round.start();
    expect(round.answerQuestion('34')).toBeTruthy();
  });

  it('should return null if no time remaining on answerQuestion()', () => {
    round.start();
    // Countdown the time
    for (; round.getTimeRemaining().value > 0; round.tick()) {}
    expect(round.answerQuestion('34')).toBeFalsy();
  });
});
