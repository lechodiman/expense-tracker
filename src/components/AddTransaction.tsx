import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTransactionsDispatch } from '../context/transactions-context';
import { Transaction } from '../types';

type FormData = {
  text: string;
  amount: number;
};

const AddTransaction: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useTransactionsDispatch();

  const onSubmit = handleSubmit((values) => {
    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000000),
      text: values.text,
      amount: values.amount,
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    reset();
    textInputRef.current?.focus();
  });

  return (
    <>
      <h3 className="pb-2 mt-10 text-xl font-bold border-b-2 border-gray-400">
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
            ref={(e) => {
              register(e, { required: true });
              textInputRef.current = e;
            }}
            placeholder="New car"
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
            ref={register({ required: true })}
            placeholder="-200"
            className="block w-full p-2 text-base border-2 border-gray-300 rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-2 mx-0 mt-4 mb-6 text-base text-white transition duration-500 ease-in-out transform bg-purple-500 shadow-md hover:-translate-y-1 hover:scale-105"
        >
          Add transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
