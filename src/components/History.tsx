import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';

interface Props {}

const isPositive = (n: number) => n > 0;
const isNegative = (n: number) => n < 0;

const round = (decimalPlace: number, n: number) => n.toFixed(decimalPlace);
const cRound = R.curry(round);

const IncomeExpenses: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  const amounts = R.pluck('amount', transactions);

  // @ts-ignore
  const sumOnly = R.compose(cRound(2), R.sum, R.filter(R.__, amounts));

  // @ts-ignore
  const totalIncome = sumOnly(isPositive);

  // @ts-ignore
  const totalExpenses = sumOnly(isNegative);

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
