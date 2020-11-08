import React from 'react';
import { useTransactionsState } from '../context/transactions-context';
import { sumAllAmounts } from '../utils/functions';

type BalanceProps = {
  className?: string;
};

const Balance: React.FC<BalanceProps> = ({ className }) => {
  const { transactions } = useTransactionsState();

  const total = sumAllAmounts(transactions);

  return (
    <div className={className}>
      <h4 className="uppercase">Your balance </h4>
      <h1 className="text-3xl tracking-wider" aria-label="total balance">
        ${total}
      </h1>
    </div>
  );
};

export default Balance;
