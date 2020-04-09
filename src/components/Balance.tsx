import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';
import { round } from '../utils/functions';
import { Transaction } from '../types';

const Balance: React.FC = () => {
  const { transactions } = useTransactionsState();

  const sumAllAmounts: (transactions: Transaction[]) => number = R.pipe(
    R.map(R.prop('amount')),
    R.sum,
    round(2)
  );

  const total = sumAllAmounts(transactions);

  return (
    <>
      <h4>Your balance </h4>
      <h1 aria-label="total">${total}</h1>
    </>
  );
};

export default Balance;
