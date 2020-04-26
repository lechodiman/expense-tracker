import React from 'react';
import { render } from '@testing-library/react';
import * as transactionContext from '../../context/transactions-context';
import Balance from '../Balance';
import { Transaction } from '../../types';

test('shows total sum', async () => {
  const { TransactionsProvider } = transactionContext;

  const transactions: Transaction[] = [
    { id: 1, amount: 200, text: 'income' },
    { id: 2, amount: -50, text: 'car' },
  ];

  const { getByLabelText } = render(
    <TransactionsProvider transactions={transactions}>
      <Balance></Balance>
    </TransactionsProvider>
  );

  const total = getByLabelText(/total balance/i);

  expect(total).toHaveTextContent('150');
});
