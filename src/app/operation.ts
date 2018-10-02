import { Operand } from './operand';
import { Result } from './result';

export type Operation = (operand1: Operand, operand2: Operand) => Result
