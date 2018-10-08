import { QuestionRound } from "./question-round";
import { BasicRoundLevel } from "./basic-round-level";

export class BasicQuestionRound extends QuestionRound {

  constructor(level: BasicRoundLevel) {
    super(level);
  }
}
