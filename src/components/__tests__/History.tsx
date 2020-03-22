import React from 'react';
import { render } from '@testing-library/react';
import * as transactionContext from '../../context/transactions-context';
import { ITransaction } from '../../types';
import History from '../History';

test('shows total income and expenses', async () => {
  const { TransactionsProvider } = transactionContext;

  const transactions: ITransaction[] = [
    { id: 1, amount: 200, text: 'income' },
    { id: 2, amount: -50, text: 'car' }
  ];

  const { getByLabelText } = render(
    <TransactionsProvider transactions={transactions}>
      <History></History>
    </TransactionsProvider>
  );

  const totalIncome = getByLabelText(/total income/i);
  const totalExpenses = getByLabelText(/total expenses/i);

  expect(totalIncome).toHaveTextContent('200');
  expect(totalExpenses).toHaveTextContent('50');
});
