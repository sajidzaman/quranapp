const initialState = {
  reciterList: null
};

const ReciterListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECITERLIST":
      return { reciterList: action.reciterList };

    default:
      return state;
  }
};

export default ReciterListReducer;
