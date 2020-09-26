const initialState = {
  value: 'hello',
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, value: action.payload };

    default:
      return state;
  }
}
