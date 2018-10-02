import { Operator } from "./operator";
import { Operand } from "./operand";
import { Result } from "./result";

let mult = function(op1: Operand, op2: Operand): Result {
  let value = op1.value * op2.value;
  return new Result(""+value, value);
}
export const MULTIPLICATION = new Operator("x", mult);

let div = function(op1: Operand, op2: Operand): Result {
  let value = op1.value / op2.value;
  return new Result(""+value, value);
}
export const DIVISION = new Operator("÷", div);

let add = function(op1: Operand, op2: Operand): Result {
  let value = op1.value + op2.value;
  return new Result(""+value, value);
}
export const ADDITION = new Operator("+", add);

let sub = function(op1: Operand, op2: Operand): Result {
  let value = op1.value - op2.value;
  return new Result(""+value, value);
}
export const SUBTRACTION = new Operator("-", sub);
