import React from 'react';
import { useTransactionsState } from './context/transactions-context';

interface Props {}

const Balance: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, amount) => (acc += amount), 0).toFixed(2);

  return (
    <>
      <h4>Your balance </h4>
      <h1>${total}</h1>
    </>
  );
};

export default Balance;
