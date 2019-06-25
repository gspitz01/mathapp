import { RoundLevel } from './round-level';
import { OperatorQuestion } from './operator-question';
import { ADDITION } from './basics/basic-operators';

describe('RoundLevel', () => {
  class MockRoundLevel extends RoundLevel {
    createQuestion(): OperatorQuestion {
      return null;
    }
  }

  it('should convert name to id, changing to lowercase, removing ":", and replacing " " with "-"', () => {
    const roundLevel = new MockRoundLevel('Something: Good For You', [ADDITION], 15);
    expect(roundLevel.id).toBe('something-good-for-you');
  });
});
