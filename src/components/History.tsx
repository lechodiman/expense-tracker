import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import { sumTotalIncome, sumTotalExpenses } from '../utils/functions';

const IncomeExpenses: React.FC = () => {
  const { transactions } = useTransactionsState();

  const totalIncome = sumTotalIncome(transactions);

  const totalExpenses = sumTotalExpenses(transactions);

  return (
    <div className="flex justify-between p-5 mx-0 my-5 bg-white rounded-md shadow-md">
      <div className="flex-1 text-center border-r">
        <h4 className="text-xl font-bold uppercase">Income</h4>
        <p aria-label="total income" className="text-xl text-green-500">
          {totalIncome}
        </p>
      </div>

      <div className="flex-1 text-center">
        <h4 className="text-xl font-bold uppercase">Expense</h4>
        <p aria-label="total expenses" className="text-xl text-red-700">
          {totalExpenses}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
