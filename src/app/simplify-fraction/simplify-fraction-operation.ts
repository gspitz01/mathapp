import { BasicOperand } from "../basic-operand";
import { FractionResult } from "../fraction-result";

export type SimplifyFractionOperation = (numerator: BasicOperand, denominator: BasicOperand) => FractionResult
