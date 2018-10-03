export class OperandLimitations {
  constructor(readonly wholeNumber: boolean, readonly numberOfDigits: number, readonly possiblyNegative: boolean,
    possiblyZero: boolean) {}
}
