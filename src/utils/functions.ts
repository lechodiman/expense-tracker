import * as R from 'ramda';
import { Transaction } from '../types';

export const isPositive = R.gt(R.__, 0);
export const isNegative = R.lt(R.__, 0);

export const round = R.curry(
  (decimalPlace: number, n: number): number => +n.toFixed(decimalPlace)
);

const sumAmountsIf = (fn: (x: number) => boolean) =>
  R.pipe(
    R.map(R.prop('amount')),
    R.filter<number, 'array'>(fn),
    R.sum,
    round(2)
  );

export const sumTotalIncome: (
  transactions: Transaction[]
) => number = sumAmountsIf(isPositive);

export const sumTotalExpenses: (
  transactions: Transaction[]
) => number = sumAmountsIf(isNegative);

export const sumAllAmounts: (
  transactions: Transaction[]
) => number = sumAmountsIf(R.T);
