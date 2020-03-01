import React, { useState } from 'react';
import { useTransactionsDispatch } from '../context/transactions-context';

interface Props {}

const AddTransaction: React.FC<Props> = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useTransactionsDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    setText('');
    setAmount('');
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>

          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
