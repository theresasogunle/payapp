import { UPDATE_BALANCE } from './actionTypes';

export const updateBalance = (balance) => ({
  type: UPDATE_BALANCE,
  payload: {balance}
})