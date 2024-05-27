// import { configureStore } from '@reduxjs/toolkit';
// import stockReducer from './stockSlice';
//
// export const store = configureStore({
//   reducer: {
//     stocks: stockReducer,
//   },
// });

import { createStore } from 'redux';
import rootReducer from './reducers'; // stocksReducer.js 파일을 임포트해야 합니다.

const store = createStore(rootReducer);

export default store;
