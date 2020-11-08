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
        <div className="w-full p-4 mx-auto sm:p-5 sm:w-8/12 lg:w-4/12">
          <Header />
          <Balance className="mt-6" />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </TransactionsProvider>
  );
};

export default App;
