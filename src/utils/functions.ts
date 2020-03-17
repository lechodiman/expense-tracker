import * as R from 'ramda';

export const isPositive = (n: number) => n > 0;
export const isNegative = (n: number) => n < 0;

export const round = R.curry((decimalPlace: number, n: number) =>
  n.toFixed(decimalPlace)
);
