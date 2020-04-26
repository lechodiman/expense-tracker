import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import { sumAllAmounts } from '../utils/functions';

const Balance: React.FC = () => {
  const { transactions } = useTransactionsState();

  const total = sumAllAmounts(transactions);

  return (
    <>
      <h4>Your balance </h4>
      <h1 aria-label="total balance">${total}</h1>
    </>
  );
};

export default Balance;
