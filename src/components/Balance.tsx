import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';
import { round } from '../utils/functions';

const Balance: React.FC = () => {
  const { transactions } = useTransactionsState();

  // @ts-ignore
  const sumTotalAmount = R.pipe(R.pluck('amount'), R.sum, round(2));

  const total: number = sumTotalAmount(transactions);

  return (
    <>
      <h4>Your balance </h4>
      <h1 aria-label="total">${total}</h1>
    </>
  );
};

export default Balance;
