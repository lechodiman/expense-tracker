import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import * as transactionContext from '../../context/transactions-context';
import { ITransaction } from '../../types';
import TransactionList from '../TransactionList';

test('removes deleted transactions', async () => {
  const { TransactionsProvider } = transactionContext;

  const transactions: ITransaction[] = [
    { id: 1, amount: 200, text: 'income' },
    { id: 2, amount: -50, text: 'car' }
  ];

  const { container } = render(
    <TransactionsProvider transactions={transactions}>
      <TransactionList></TransactionList>
    </TransactionsProvider>
  );

  const income = getByText(container, /income/);
  const car = getByText(container, /car/);

  fireEvent.click(getByText(car, /x/i));
  fireEvent.click(getByText(income, /x/i));

  expect(car).not.toBeInTheDocument();
  expect(income).not.toBeInTheDocument();
});
