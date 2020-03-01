import React, { createContext, useReducer, useContext } from 'react';
import {
  DELETE_TRANSACTION,
  TransactionsState,
  Action,
  ADD_TRANSACTION
} from './types';

type Dispatch = (action: Action) => void;

const TransactionsStateContext = createContext<TransactionsState | undefined>(
  undefined
);

const TransactionsDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

const transactionsReducer = (state: TransactionsState, action: Action) => {
  switch (action.type) {
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload.id
        )
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    default:
      return state;
  }
};

const TransactionsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions: []
  });

  return (
    <TransactionsStateContext.Provider
      value={{ transactions: state.transactions }}
    >
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
};

const useTransactionsState = () => {
  const context = useContext(TransactionsStateContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return context;
};
const useTransactionsDispatch = () => {
  const context = useContext(TransactionsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return context;
};

export { TransactionsProvider, useTransactionsState, useTransactionsDispatch };
