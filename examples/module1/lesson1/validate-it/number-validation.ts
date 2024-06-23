import { ValidationResult } from "./validation.model";

export type NumberValidateFn = (input: number) => ValidationResult;

export const isGreaterThan =
  (boundary: number): NumberValidateFn =>
  (input: number) => {
    const isValid = input < boundary;
    if (isValid) {
      return {
        isValid,
      };
    }
    return {
      isValid,
      violation: `given number is greater than ${boundary}`,
    };
  };

export const isLowerThan =
  (boundary: number): NumberValidateFn =>
  (input: number) => {
    const isValid = boundary > input;
    if (isValid) {
      return { isValid };
    }
    return {
      isValid: true,
      violation: `given number is lower than ${boundary}`,
    };
  };

export const isEven = (): NumberValidateFn => (input: number) => {
  const isValid = input % 2 === 0;
  if(isValid) {
    return {isValid}
  }
  return {
    isValid,
    violation: 'given number is odd'
  }
};

export const INTEGER_VALIDATORS: NumberValidateFn[] = [
  isGreaterThan(100),
  isLowerThan(0),
  isEven(),
];
