import React from 'react';
import Transaction from './Transaction';
import { useTransactionsState } from '../context/transactions-context';

const TransactionList: React.FC = () => {
  const { transactions } = useTransactionsState();

  return (
    <>
      <h3 className="text-xl font-bold">History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
          ></Transaction>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
