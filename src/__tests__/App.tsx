import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

test('adds a new transaction to the list and it updates balance', async () => {
  const fakeTransaction = {
    name: 'car',
    amount: '200',
  };

  const { getByText, getByLabelText, findByText } = render(<App></App>);

  const textInput = getByLabelText(/text/i);
  const amountInput = getByLabelText(/amount/i);
  const submitButton = getByText(/add transaction/i);

  const totalBalance = getByLabelText(/total balance/i);
  expect(totalBalance).toHaveTextContent('0');

  await userEvent.type(textInput, fakeTransaction.name);
  await userEvent.type(amountInput, fakeTransaction.amount);
  fireEvent.click(submitButton);

  const somethingExpense = await findByText(fakeTransaction.name);

  expect(somethingExpense).toBeInTheDocument();
  expect(totalBalance).toHaveTextContent(fakeTransaction.amount);

  fireEvent.click(within(somethingExpense).getByText(/x/i));
  expect(totalBalance).toHaveTextContent('0');
});
