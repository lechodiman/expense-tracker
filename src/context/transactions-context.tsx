import React, {
  useMemo,
  useCallback,
  createContext,
  useReducer,
  useContext,
} from 'react';
import * as R from 'ramda';
import {
  DELETE_TRANSACTION,
  TransactionsState,
  Action,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
} from './types';
import { Transaction } from '../types';

const TransactionsStateContext = createContext<TransactionsState | undefined>(
  undefined
);

interface TransactionsApi {
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

const TransactionsApiContext = createContext<TransactionsApi | undefined>(
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

  const addTransaction = useCallback(
    (transaction: Transaction) => {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    },
    [dispatch]
  );

  const deleteTransaction = useCallback(
    (id: number): void => {
      dispatch({ type: 'DELETE_TRANSACTION', payload: { id } });
    },
    [dispatch]
  );

  const api = useMemo(
    () => ({
      addTransaction,
      deleteTransaction,
    }),
    [addTransaction, deleteTransaction]
  );

  return (
    <TransactionsStateContext.Provider
      value={{ transactions: state.transactions }}
    >
      <TransactionsApiContext.Provider value={api}>
        {children}
      </TransactionsApiContext.Provider>
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
const useTransactionsApi = () => {
  const context = useContext(TransactionsApiContext);
  if (R.isNil(context)) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return context;
};

export { TransactionsProvider, useTransactionsState, useTransactionsApi };
