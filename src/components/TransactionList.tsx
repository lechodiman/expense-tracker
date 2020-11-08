import React from 'react';
import Transaction from './Transaction';
import { useTransactionsState } from '../context/transactions-context';
import { AnimatePresence } from 'framer-motion';

const TransactionList: React.FC = () => {
  const { transactions } = useTransactionsState();

  return (
    <>
      <h3 className="pb-2 mt-10 text-xl font-bold border-b-2 border-gray-400">
        History
      </h3>
      <ul className="list">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};

export default TransactionList;
