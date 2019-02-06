import { TimeLimitedQuestionRound } from "../time-limited-question-round";
import { Seconds } from "../seconds";
import { SimplifyFractionRoundLevel } from "./simplify-fraction-round-level";

/**
 * A TimeLimitedQuestionRound from a SimplifyFractionRoundLevel
 */
export class SimplifyFractionTimeLimitedRound extends TimeLimitedQuestionRound {
  constructor(time: Seconds, roundLevel: SimplifyFractionRoundLevel) {
    super(time, roundLevel);
  }
}
