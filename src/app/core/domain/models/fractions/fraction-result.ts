import { Result } from "../result";
import { BasicResult } from "../basics/basic-result";


export class FractionResult implements Result {
  constructor(readonly numerator: BasicResult, readonly denominator: BasicResult) {}
}
