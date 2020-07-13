import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddTransaction from '../AddTransaction';
import * as transactionContext from '../../context/transactions-context';
import userEvent from '@testing-library/user-event';

test('adds a positive transaction', async () => {
  const { TransactionsProvider } = transactionContext;
  const mockDispatch = jest.fn();

  const mockUseTransactionsDispatch = jest
    .spyOn(transactionContext, 'useTransactionsDispatch')
    .mockReturnValue(mockDispatch);

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

  expect(mockUseTransactionsDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'ADD_TRANSACTION',
    payload: {
      id: expect.any(Number),
      text: transactionName,
      amount: parseInt(transactionAmount),
    },
  });
  expect(textInput).toHaveTextContent('');
  expect(amountInput).toHaveTextContent('');
  expect(amountInput).toBeTruthy();
});
