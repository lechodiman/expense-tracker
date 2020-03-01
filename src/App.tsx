import React from 'react';
import './App.css';
import Balance from './components/Balance';
import IncomeExpenses from './components/History';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
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
