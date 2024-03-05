export const isInteger = (value: string): boolean =>
  value !== '' && Number.isInteger(Number(value));
