import { Result } from '../../../shared/models/result';
import { BasicResult } from '../../../shared/models/basic-result';

export class FractionResult implements Result {
  constructor(readonly numerator: BasicResult, readonly denominator: BasicResult) {}
}
