import { BasicOperator } from "./basic-operator";

let mult = function(op1: number, op2: number): number {
  return op1 * op2;
}
export const MULTIPLICATION = new BasicOperator("⋅", mult);

let div = function(op1: number, op2: number): number {
  return op1 / op2;
}
export const DIVISION = new BasicOperator("/", div);

let add = function(op1: number, op2: number): number {
  return op1 + op2;
}
export const ADDITION = new BasicOperator("+", add);

let sub = function(op1: number, op2: number): number {
  return op1 - op2;
}
export const SUBTRACTION = new BasicOperator("-", sub);

let gcf = function(op1: number, op2: number): number {
  let smaller = Math.min(Math.abs(op1), Math.abs(op2));
  let gcf = 1;
  for (let i = smaller; i > 1; i--) {
    if (op1 % i == 0 && op2 % i == 0) {
      gcf *= i;
      op1 /= i;
      op2 /= i;
    }
  }
  return gcf;
}
export const GCF = new BasicOperator("", gcf);
