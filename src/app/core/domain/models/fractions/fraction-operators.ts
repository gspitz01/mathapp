import { FractionOperator } from "./fraction-operator";
import { FractionOperand } from "./fraction-operand";
import { FractionResult } from "./fraction-result";
import { SimplifyFractionOperator } from "./simplify-fraction-operator";
import { BasicResult } from "../basics/basic-result";
import { BasicOperand } from "../basics/basic-operand";

function reduceFraction(numerator: number, denominator: number): FractionResult {
  let smaller = Math.min(Math.abs(numerator), Math.abs(denominator));
  let newNum = numerator;
  let newDen = denominator;
  for (let i = smaller; i > 1; i--) {
    if (newNum % i == 0 && newDen % i == 0) {
      newNum /= i;
      newDen /= i;
    }
  }
  if (newNum === 0) {
    newDen = 1;
  }
  return new FractionResult(new BasicResult(newNum), new BasicResult(newDen));
}

function simplifyFraction(numerator: BasicOperand, denominator: BasicOperand): FractionResult {
  return reduceFraction(numerator.value, denominator.value);
}
export const SIMPLIFY_FRACTION = new SimplifyFractionOperator("", simplifyFraction);

let fractionMult = function(op1: FractionOperand, op2: FractionOperand): FractionResult {
  let resultNumValue = op1.numerator.value * op2.numerator.value;
  let resultDenValue = op1.denominator.value * op2.denominator.value;
  return reduceFraction(resultNumValue, resultDenValue);
};
export const FRACTION_MULTIPLICATION = new FractionOperator("x", fractionMult);

let fractionDiv = function(op1: FractionOperand, op2: FractionOperand): FractionResult {
  let newOp2 = new FractionOperand(op2.denominator, op2.numerator);
  return fractionMult(op1, newOp2);
}
export const FRACTION_DIVISION = new FractionOperator("÷", fractionDiv);

let fractionAdd = function(op1: FractionOperand, op2: FractionOperand): FractionResult {
  let commonDen = op1.denominator.value * op2.denominator.value;
  let num1 = op1.numerator.value * op2.denominator.value;
  let num2 = op2.numerator.value * op1.denominator.value;
  return reduceFraction(num1 + num2, commonDen);
}
export const FRACTION_ADDITION = new FractionOperator("+", fractionAdd);

let fractionSub = function(op1: FractionOperand, op2: FractionOperand): FractionResult {
  let commonDen = op1.denominator.value * op2.denominator.value;
  let num1 = op1.numerator.value * op2.denominator.value;
  let num2 = op2.numerator.value * op1.denominator.value;
  return reduceFraction(num1 - num2, commonDen);
}
export const FRACTION_SUBTRACTION = new FractionOperator("-", fractionSub);