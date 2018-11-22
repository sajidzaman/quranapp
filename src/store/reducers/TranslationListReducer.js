const initialState = {
  translationList: null
};

const TranslationListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRANSLATIONLIST":
      return {
        translationList: action.translationList
      };

    default:
      return state;
  }
};

export default TranslationListReducer;
