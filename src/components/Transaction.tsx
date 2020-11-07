import React from 'react';
import { Transaction } from '../types';
import { useTransactionsDispatch } from '../context/transactions-context';

interface Props {
  transaction: Transaction;
}

const TransactionDetails: React.FC<Props> = ({ transaction }) => {
  const dispatch = useTransactionsDispatch();

  const deleteTransaction = (): void => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: { id: transaction.id } });
  };

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li
      className={`bg-white shadow-sm text-blue-900 flex justify-between relative p-3 my-3 border-r-4 ${
        transaction.amount < 0 ? 'border-red-400' : 'border-green-400'
      }`}
    >
      {transaction.text}{' '}
      <span>
        {sign} ${Math.abs(transaction.amount)}
      </span>
      <button
        onClick={deleteTransaction}
        className="absolute left-0 px-2 py-1 text-lg leading-5 text-white transition-opacity duration-200 ease-in-out transform -translate-x-full bg-red-600 border-0 opacity-0 cursor-pointer delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default TransactionDetails;
