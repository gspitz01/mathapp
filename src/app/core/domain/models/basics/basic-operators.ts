import { BasicOperator } from './basic-operator';

const mult = function(op1: number, op2: number): number {
  return op1 * op2;
};
export const MULTIPLICATION = new BasicOperator('⋅', mult);

const div = function(op1: number, op2: number): number {
  return op1 / op2;
};
export const DIVISION = new BasicOperator('/', div);

const add = function(op1: number, op2: number): number {
  return op1 + op2;
};
export const ADDITION = new BasicOperator('+', add);

const sub = function(op1: number, op2: number): number {
  return op1 - op2;
};
export const SUBTRACTION = new BasicOperator('-', sub);

const gcf = function(op1: number, op2: number): number {
  const smaller = Math.min(Math.abs(op1), Math.abs(op2));
  let gcfNum = 1;
  for (let i = smaller; i > 1; i--) {
    if (op1 % i === 0 && op2 % i === 0) {
      gcfNum *= i;
      op1 /= i;
      op2 /= i;
    }
  }
  return gcfNum;
};
export const GCF = new BasicOperator('', gcf);

const lcm = function(op1: number, op2: number): number {
  return (op1 * op2) / gcf(op1, op2);
};
export const LCM = new BasicOperator('', lcm);

const exponentiation = function(op1: number, op2: number): number {
  return Math.pow(op1, op2);
};
export const EXPONENTIATION = new BasicOperator('^', exponentiation);
