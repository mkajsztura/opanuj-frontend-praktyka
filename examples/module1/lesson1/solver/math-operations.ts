import { OperationResult } from './math-operations.model';

export function sum(addend1: number, addend2: number): OperationResult {
  return {
    result: addend1 + addend2,
  };
}

export function subtract(minuend: number, subtrahend: number): OperationResult {
  return {
    result: minuend - subtrahend,
  };
}

export function multiply(factorA: number, factorB: number): OperationResult {
  return {
    result: factorA * factorB,
  };
}

export function divide(dividend: number, divisor: number): OperationResult {
  return {
    result: dividend / divisor,
    error: divisor === 0 ? 'You cannot divide by 0' : '',
  };
}
