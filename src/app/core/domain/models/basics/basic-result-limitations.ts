import { BasicResult } from './basic-result';

export class BasicResultLimitations {
  constructor(readonly wholeNumber: boolean, readonly possiblyNegative: boolean) {}

  resultSatisfiesLimitations(result: BasicResult): boolean {
    if (result === null) {
      return false;
    } else {
      if ((!this.possiblyNegative && result.value < 0) ||
          (this.wholeNumber && !Number.isInteger(result.value))) {
        return false;
      } else {
        return true;
      }
    }
  }
}
