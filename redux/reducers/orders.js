import { UPDATE_ORDERS, LOADING, SET_ERROR } from '../actionTypes';

const initialState = {
  orders: [],
  error: false,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORDERS: {
      const {data} = action.payload      
      return {error: false, orders: data.data.orders, loading: false};
    }
    case LOADING: {
      return { ...state, loading: true, error: false};
    }
    case SET_ERROR: {
      return { ...state, loading: false, error: true};
    }
    default:
      return state;
  }
}