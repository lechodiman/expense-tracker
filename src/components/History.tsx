import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';
import { round } from '../utils/functions';

const IncomeExpenses: React.FC<{}> = () => {
  const { transactions } = useTransactionsState();

  const totalIncome = R.pipe(
    R.map(R.prop('amount')),
    R.filter<number, 'array'>(R.gt(R.__, 0)),
    R.sum,
    round(2)
  )(transactions);

  const totalExpenses = R.pipe(
    R.map(R.prop('amount')),
    R.filter<number, 'array'>(R.lt(R.__, 0)),
    R.sum,
    round(2)
  )(transactions);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p aria-label="total income" className="money plus">
          {totalIncome}
        </p>
      </div>

      <div>
        <h4>Expense</h4>
        <p aria-label="total expenses" className="money minus">
          {totalExpenses}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
