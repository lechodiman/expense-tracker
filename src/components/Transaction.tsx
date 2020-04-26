import React from 'react';
import { Transaction } from '../types';
import { useTransactionsApi } from '../context/transactions-context';

interface Props {
  transaction: Transaction;
}

const TransactionDetails: React.FC<Props> = ({ transaction }) => {
  const { deleteTransaction } = useTransactionsApi();

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {sign} ${Math.abs(transaction.amount)}
      </span>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default TransactionDetails;
