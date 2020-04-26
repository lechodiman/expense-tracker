import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('adds a new transaction to the list and it updates balance', async () => {
  const fakeTransaction = {
    name: 'car',
    amount: '200',
  };

  const { container, getByLabelText } = render(<App></App>);

  const textInput = getByLabelText(/text/i);
  const amountInput = getByLabelText(/amount/i);
  const submitButton = getByText(container, /add transaction/i);

  await userEvent.type(textInput, fakeTransaction.name);
  await userEvent.type(amountInput, fakeTransaction.amount);

  fireEvent.click(submitButton);

  const somethingExpense = getByText(container, fakeTransaction.name);
  const totalBalance = getByLabelText(/total balance/i);

  expect(somethingExpense).toBeInTheDocument();
  expect(totalBalance).toHaveTextContent(fakeTransaction.amount);

  fireEvent.click(getByText(somethingExpense, /x/i));
  expect(totalBalance).toHaveTextContent('0');
});
