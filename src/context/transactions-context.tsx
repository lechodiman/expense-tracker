import React, { createContext, useReducer, useContext } from 'react';
import * as R from 'ramda';
import {
  DELETE_TRANSACTION,
  TransactionsState,
  Action,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
} from './types';
import { Transaction } from '../types';

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
      return R.evolve(
        {
          transactions: R.reject(R.propEq('id', idToDelete)),
        },
        state
      );
    case ADD_TRANSACTION:
      return R.evolve(
        {
          transactions: R.append(action.payload),
        },
        state
      );
    case UPDATE_TRANSACTION:
      const { id } = action.payload;
      const transactionIndex = R.findIndex(
        R.propEq('id', id),
        state.transactions
      );
      return R.evolve(
        {
          transactions: R.update(transactionIndex, action.payload.transaction),
        },
        state
      );
    default:
      return state;
  }
};

interface TransactionsProviderProps {
  transactions?: Transaction[];
}

const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  children,
  transactions = [],
}) => {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions,
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
  const transactions = useContext(TransactionsStateContext);
  if (R.isNil(transactions)) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return transactions;
};
const useTransactionsDispatch = () => {
  const dispatch = useContext(TransactionsDispatchContext);
  if (R.isNil(dispatch)) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return dispatch;
};

export { TransactionsProvider, useTransactionsState, useTransactionsDispatch };
