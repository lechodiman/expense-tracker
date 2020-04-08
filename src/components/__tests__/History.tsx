import React from 'react';
import { render } from '@testing-library/react';
import * as transactionContext from '../../context/transactions-context';
import { Transaction } from '../../types';
import History from '../History';
import * as R from 'ramda';

test('shows total income and expenses', async () => {
  const { TransactionsProvider } = transactionContext;

  const transactions: Transaction[] = [
    { id: 1, amount: 200, text: 'income' },
    { id: 2, amount: -50, text: 'car' },
  ];

  const { getByLabelText } = render(
    <TransactionsProvider transactions={transactions}>
      <History />
    </TransactionsProvider>
  );

  const totalIncome = getByLabelText(/total income/i);
  const totalExpenses = getByLabelText(/total expenses/i);

  const expectedTotalIncome = R.pipe(
    R.map(R.prop('amount')),
    R.filter<number, 'array'>(R.gt(R.__, 0)),
    R.sum
  )(transactions);

  const expectedTotalExpenses = R.pipe(
    R.map(R.prop('amount')),
    R.filter<number, 'array'>(R.lt(R.__, 0)),
    R.sum
  )(transactions);

  expect(totalIncome).toHaveTextContent(`${expectedTotalIncome}`);
  expect(totalExpenses).toHaveTextContent(`${expectedTotalExpenses}`);
});
