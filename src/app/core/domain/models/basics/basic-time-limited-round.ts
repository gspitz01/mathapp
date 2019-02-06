import { TimeLimitedQuestionRound } from '../time-limited-question-round';
import { Seconds } from '../seconds';
import { BasicRoundLevel } from './basic-round-level';

/**
 * A TimeLimitedQuestionRound from a BasicRoundLevel
 */
export class BasicTimeLimitedRound extends TimeLimitedQuestionRound {
  constructor(time: Seconds, roundLevel: BasicRoundLevel) {
    super(time, roundLevel);
  }
}
