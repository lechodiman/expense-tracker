import React from 'react';
import './styles.css';
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
      <div className="flex flex-col items-center justify-center min-h-screen m-0 bg-gray-300 font-body">
        <div className="w-10/12 p-8 mx-auto sm:w-8/12 lg:w-4/12">
          <Header />
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </TransactionsProvider>
  );
};

export default App;
