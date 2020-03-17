import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';
import { round, isPositive, isNegative } from '../utils/functions';

interface Props {}

const IncomeExpenses: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  const amounts = R.pluck('amount', transactions);

  // @ts-ignore
  const sumOnly = R.compose(round(2), R.sum, R.filter(R.__, amounts));

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
