import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import { sumTotalIncome, sumTotalExpenses } from '../utils/functions';

const IncomeExpenses: React.FC<{}> = () => {
  const { transactions } = useTransactionsState();

  const totalIncome = sumTotalIncome(transactions);

  const totalExpenses = sumTotalExpenses(transactions);

  return (
    <div className="inc-exp-container">
      <div>
        <h4 className="text-xl font-bold">Income</h4>
        <p aria-label="total income" className="money plus">
          {totalIncome}
        </p>
      </div>

      <div>
        <h4 className="text-xl font-bold">Expense</h4>
        <p aria-label="total expenses" className="money minus">
          {totalExpenses}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
