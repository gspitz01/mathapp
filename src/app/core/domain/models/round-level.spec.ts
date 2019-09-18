import { RoundLevel } from './round-level';
import { OperatorQuestion } from './operator-question';
import { ADDITION } from './basics/basic-operators';
import { Operator } from './operator';

describe('RoundLevel', () => {
  class MockRoundLevel extends RoundLevel {
    createQuestion(): OperatorQuestion {
      return null;
    }

    mockChooseOperator(): Operator {
      return this.chooseOperator();
    }
  }

  it('should convert name to id, changing to lowercase, removing ":", and replacing " " with "-"', () => {
    const roundLevel = new MockRoundLevel('Something: Good For You', [ADDITION], 15, 10);
    expect(roundLevel.id).toBe('something-good-for-you');
  });

  it('should return null on chooseOperator if no operators', () => {
    const roundLevel = new MockRoundLevel('Something', [], 15, 10);
    expect(roundLevel.mockChooseOperator()).toBeFalsy();
  });
});
