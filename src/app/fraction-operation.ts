import { FractionOperand } from "./fraction-operand";
import { FractionResult } from "./fraction-result";

export type FractionOperation = (operand1: FractionOperand, operand2: FractionOperand) => FractionResult
