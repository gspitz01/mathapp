import { BasicOperand } from "../../../shared/models/basic-operand";
import { FractionResult } from "../models/fraction-result";

export type SimplifyFractionOperation = (numerator: BasicOperand, denominator: BasicOperand) => FractionResult
