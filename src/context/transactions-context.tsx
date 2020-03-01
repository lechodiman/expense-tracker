import React, { createContext, useReducer, useContext } from 'react';
import * as R from 'ramda';
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
      const { id: idToDelete } = action.payload;

      return {
        ...state,
        transactions: R.reject(R.propEq('id', idToDelete))(state.transactions)
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: R.append(action.payload, state.transactions)
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
  if (R.isNil(context)) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return context;
};
const useTransactionsDispatch = () => {
  const context = useContext(TransactionsDispatchContext);
  if (R.isNil(context)) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return context;
};

export { TransactionsProvider, useTransactionsState, useTransactionsDispatch };
