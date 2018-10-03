import { Operator } from "./operator";
import { OperandLimitations } from "./operand-limitations";
import { ResultLimitations } from './result-limitations';

export class RoundLevel {
  constructor(readonly value: number, readonly name: string, readonly operators: Operator[],
    readonly operand1Limitations: OperandLimitations, readonly operand2Limitations: OperandLimitations,
    readonly resultLimitations: ResultLimitations) {}
}
