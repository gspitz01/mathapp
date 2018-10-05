import { Operator } from "./operator";

let mult = function(op1: number, op2: number): number {
  return op1 * op2;
}
export const MULTIPLICATION = new Operator("x", mult);

let div = function(op1: number, op2: number): number {
  return op1 / op2;
}
export const DIVISION = new Operator("÷", div);

let add = function(op1: number, op2: number): number {
  return op1 + op2;
}
export const ADDITION = new Operator("+", add);

let sub = function(op1: number, op2: number): number {
  return op1 - op2;
}
export const SUBTRACTION = new Operator("-", sub);
