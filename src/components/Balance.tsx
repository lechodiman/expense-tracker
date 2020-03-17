import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';
import { round } from '../utils/functions';

interface Props {}

const Balance: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  // @ts-ignore
  const sumTotalAmount = R.pipe(R.pluck('amount'), R.sum, round(2));

  const total = sumTotalAmount(transactions);

  return (
    <>
      <h4>Your balance </h4>
      <h1>${total}</h1>
    </>
  );
};

export default Balance;
