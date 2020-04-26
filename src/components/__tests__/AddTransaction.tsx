import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddTransaction from '../AddTransaction';
import * as transactionContext from '../../context/transactions-context';
import userEvent from '@testing-library/user-event';

test('adds a positive transaction', async () => {
  const { TransactionsProvider } = transactionContext;
  const mockAddTransaction = jest.fn();

  jest.spyOn(transactionContext, 'useTransactionsApi').mockReturnValue({
    addTransaction: mockAddTransaction,
    deleteTransaction: jest.fn(),
  });

  const { getByText, getByLabelText } = render(
    <TransactionsProvider>
      <AddTransaction></AddTransaction>
    </TransactionsProvider>
  );

  const textInput = getByLabelText(/text/i);
  const amountInput = getByLabelText(/amount/i);
  const submitButton = getByText(/add transaction/i);

  const transactionName = 'something';
  const transactionAmount = '200';
  await userEvent.type(textInput, transactionName);
  await userEvent.type(amountInput, transactionAmount);

  fireEvent.click(submitButton);

  expect(mockAddTransaction).toHaveBeenCalledTimes(1);
  expect(mockAddTransaction).toHaveBeenCalledWith({
    id: expect.any(Number),
    text: transactionName,
    amount: parseInt(transactionAmount),
  });
  expect(textInput).toHaveTextContent('');
  expect(amountInput).toHaveTextContent('');
  expect(amountInput).toBeTruthy();
});
