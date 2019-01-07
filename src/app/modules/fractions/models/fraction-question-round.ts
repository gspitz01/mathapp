import { QuestionRound } from "../../../shared/models/question-round";
import { FractionRoundLevel } from "./fraction-round-level";

export class FractionQuestionRound extends QuestionRound {
  constructor(level: FractionRoundLevel) {
    super(level);
  }
}
