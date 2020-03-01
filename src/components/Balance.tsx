import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';

interface Props {}

const Balance: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  const amounts = transactions.map(R.prop('amount'));
  const total = R.sum(amounts).toFixed(2);

  return (
    <>
      <h4>Your balance </h4>
      <h1>${total}</h1>
    </>
  );
};

export default Balance;
