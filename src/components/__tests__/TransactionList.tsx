import {
  wait,
  fireEvent,
  render,
  within,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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

  render(
    <TransactionsProvider transactions={transactions}>
      <TransactionList></TransactionList>
    </TransactionsProvider>
  );

  const income = screen.getByText(/income/i);
  const car = screen.getByText(/car/i);

  fireEvent.click(within(car).getByText(/x/i));
  fireEvent.click(within(income).getByText(/x/i));

  await wait(() => {
    expect(screen.queryByText(/car/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/income/i)).not.toBeInTheDocument();
  });
});
