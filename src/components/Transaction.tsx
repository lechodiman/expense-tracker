import React from 'react';
import { ITransaction } from '../types';
import { useTransactionsDispatch } from '../context/transactions-context';

interface Props {
  transaction: ITransaction;
}

const Transaction: React.FC<Props> = ({ transaction }) => {
  const dispatch = useTransactionsDispatch();

  const deleteTransaction = () => {
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
