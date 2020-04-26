import { fireEvent, render, within } from '@testing-library/react';
import React from 'react';
import * as transactionContext from '../../context/transactions-context';
import { Transaction } from '../../types';
import TransactionList from '../TransactionList';

test('removes deleted transactions', async () => {
  const { TransactionsProvider } = transactionContext;

  const transactions: Transaction[] = [
    { id: 1, amount: 200, text: 'income' },
    { id: 2, amount: -50, text: 'car' },
  ];

  const { getByText } = render(
    <TransactionsProvider transactions={transactions}>
      <TransactionList></TransactionList>
    </TransactionsProvider>
  );

  const income = getByText(/income/);
  const car = getByText(/car/);

  fireEvent.click(within(car).getByText(/x/i));
  fireEvent.click(within(income).getByText(/x/i));

  expect(car).not.toBeInTheDocument();
  expect(income).not.toBeInTheDocument();
});
