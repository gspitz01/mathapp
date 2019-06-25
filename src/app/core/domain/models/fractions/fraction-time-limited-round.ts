import { TimeLimitedQuestionRound } from '../time-limited-question-round';
import { Seconds } from '../seconds';
import { FractionRoundLevel } from './fraction-round-level';

/**
 * A TimeLimitedQuestionRound from a FractionRoundLevel
 */
export class FractionTimeLimitedRound extends TimeLimitedQuestionRound {
  constructor(time: Seconds, roundLevel: FractionRoundLevel) {
    super(time, roundLevel);
  }
}
