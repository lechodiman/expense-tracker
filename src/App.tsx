import React from 'react';
import './App.css';
import Balance from './Balance';
import IncomeExpenses from './History';
import Header from './Header';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import { TransactionsProvider } from './context/transactions-context';

const App: React.FC = () => {
  return (
    <TransactionsProvider>
      <Header></Header>
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </TransactionsProvider>
  );
};

export default App;
