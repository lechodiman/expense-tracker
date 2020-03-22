import React from 'react';
import { Transaction } from '../types';
import { useTransactionsDispatch } from '../context/transactions-context';

interface Props {
  transaction: Transaction;
}

const Transaction: React.FC<Props> = ({ transaction }) => {
  const dispatch = useTransactionsDispatch();

  const deleteTransaction = (): void => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: { id: transaction.id } });
  };

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {sign} ${Math.abs(transaction.amount)}
      </span>
      <button onClick={deleteTransaction} className="delete-btn">
        x
      </button>
    </li>
  );
};

export default Transaction;
