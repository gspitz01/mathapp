import { BasicOperator } from "./basic-operator";

let mult = function(op1: number, op2: number): number {
  return op1 * op2;
}
export const MULTIPLICATION = new BasicOperator("x", mult);

let div = function(op1: number, op2: number): number {
  return op1 / op2;
}
export const DIVISION = new BasicOperator("÷", div);

let add = function(op1: number, op2: number): number {
  return op1 + op2;
}
export const ADDITION = new BasicOperator("+", add);

let sub = function(op1: number, op2: number): number {
  return op1 - op2;
}
export const SUBTRACTION = new BasicOperator("-", sub);
