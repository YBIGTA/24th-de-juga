import { combineReducers } from 'redux';
import stocksReducer from './stockReducer';

const rootReducer = combineReducers({
  stocks: stocksReducer,
});

export default rootReducer;