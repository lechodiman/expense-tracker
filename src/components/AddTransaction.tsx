import React, { useState } from 'react';
import { useTransactionsDispatch } from '../context/transactions-context';
import { Transaction } from '../types';

const AddTransaction: React.FC = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useTransactionsDispatch();

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    setText('');
    setAmount('');
  };

  return (
    <>
      <h3 className="pb-2 mt-10 text-xl font-bold border-b-2 border-gray-300">
        Add new transaction
      </h3>

      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text" className="inline-block my-3">
            Text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="block w-full p-2 text-base border-2 border-gray-300 rounded-sm"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount" className="inline-block my-3">
            Amount <br />
            (negative - expense, positive - income)
          </label>

          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="block w-full p-2 text-base border-2 border-gray-300 rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-2 mx-0 mt-4 mb-6 text-base text-white bg-purple-500 shadow-md"
        >
          Add transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
