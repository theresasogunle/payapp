import { combineReducers } from "redux";
import balance from './balance';
import orders from './orders';

export default combineReducers({ balance, orders });