import { FractionResult } from "./fraction-result";
import { BasicOperand } from "../basic-operand";

export type SimplifyFractionOperation = (numerator: BasicOperand, denominator: BasicOperand) => FractionResult
