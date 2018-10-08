import { FractionResult } from "./fraction-result";
import { BasicResultLimitations } from "./basic-result-limitations";

export class FractionResultLimitations {

  constructor(readonly numeratorLimitations: BasicResultLimitations, readonly denominatorLimitations: BasicResultLimitations) {}

  resultSatisfiesLimitations(result: FractionResult): boolean {
    return this.numeratorLimitations.resultSatisfiesLimitations(result.numerator) &&
      this.denominatorLimitations.resultSatisfiesLimitations(result.denominator);
  }
}
