import { Transaction } from '../types';

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';

interface DeleteTransactionAction {
  type: typeof DELETE_TRANSACTION;
  payload: { id: number };
}

interface AddTransactionAction {
  type: typeof ADD_TRANSACTION;
  payload: Transaction;
}

interface UpdateTransactionAction {
  type: typeof UPDATE_TRANSACTION;
  payload: { id: number; transaction: Transaction };
}

export interface TransactionsState {
  transactions: Transaction[];
}

export type Action =
  | DeleteTransactionAction
  | AddTransactionAction
  | UpdateTransactionAction;
