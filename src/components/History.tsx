import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import { sumTotalIncome, sumTotalExpenses } from '../utils/functions';

const IncomeExpenses: React.FC<{}> = () => {
  const { transactions } = useTransactionsState();

  const totalIncome = sumTotalIncome(transactions);

  const totalExpenses = sumTotalExpenses(transactions);

  return (
    <div className="rounded-md bg-white shadow-md p-5 flex justify-between my-5 mx-0">
      <div className="flex-1 text-center border-r">
        <h4 className="text-xl font-bold">Income</h4>
        <p aria-label="total income" className="money plus">
          {totalIncome}
        </p>
      </div>

      <div className="flex-1 text-center">
        <h4 className="text-xl font-bold">Expense</h4>
        <p aria-label="total expenses" className="money minus">
          {totalExpenses}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
