import { FractionResult } from "./fraction-result";
import { BasicOperand } from "../basics/basic-operand";

export type SimplifyFractionOperation = (numerator: BasicOperand, denominator: BasicOperand) => FractionResult
