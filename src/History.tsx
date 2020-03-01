import React from 'react';
import { useTransactionsState } from './context/transactions-context';

interface Props {}

const sumReducer = (acc: number, amount: number) => (acc += amount);
const positive = (n: number) => n > 0;
const negative = (n: number) => n < 0;

const IncomeExpenses: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  const amounts = transactions.map(transaction => transaction.amount);

  const totalIncome = amounts
    .filter(positive)
    .reduce(sumReducer, 0)
    .toFixed(2);

  const totalExpenses = amounts
    .filter(negative)
    .reduce(sumReducer, 0)
    .toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{totalIncome}</p>
      </div>

      <div>
        <h4>Expense</h4>
        <p className="money minus">{totalExpenses}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
