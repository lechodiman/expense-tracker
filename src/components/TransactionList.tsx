import React from 'react';
import Transaction from './Transaction';
import { useTransactionsState } from '../context/transactions-context';

interface Props {}

const TransactionList: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
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