import { Result } from './result';

export class FractionResult implements Result {
  constructor(readonly numerator: number, readonly denominator: number) {}
}
