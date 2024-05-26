const initialState = {
  selectedStocks: [],
};

const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return {
        ...state,
        selectedStocks: [...state.selectedStocks, action.payload],
      };
    default:
      return state;
  }
};

export default stocksReducer;