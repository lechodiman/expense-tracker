import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import * as R from 'ramda';

interface Props {}

const positive = (n: number) => n > 0;
const negative = (n: number) => n < 0;

const IncomeExpenses: React.FC<Props> = () => {
  const { transactions } = useTransactionsState();

  const amounts = transactions.map(R.prop('amount'));

  const round = (n: number) => n.toFixed(2);
  const aproximateSum = R.compose(round, R.sum);

  const totalIncome = aproximateSum(R.filter(positive, amounts));
  const totalExpenses = aproximateSum(R.filter(negative, amounts));

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
