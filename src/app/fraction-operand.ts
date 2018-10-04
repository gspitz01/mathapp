import { Operand } from './operand';

export class FractionOperand {
  constructor(readonly numerator: Operand, readonly denominator: Operand) {}
}
