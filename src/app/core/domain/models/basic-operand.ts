import { Operand } from "./operand";

export class BasicOperand implements Operand {
  constructor(readonly value: number) {}
}
