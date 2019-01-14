import { QuestionRound } from "../../../shared/models/question-round";
import { SimplifyFractionRoundLevel } from "./simplify-fraction-round-level";

export class SimplifyFractionQuestionRound extends QuestionRound {
  constructor(level: SimplifyFractionRoundLevel) {
    super(level);
  }
}