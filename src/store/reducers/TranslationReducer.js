const initialState = {
  translation: null
};

const TranslationReducer = (state = initialState, action) => {
  // console.log("reducerSurah", state);
  // console.log("ActionSurah", action);
  switch (action.type) {
    case "TRANSLATION":
      return {
        translation: action.translation
      };

    default:
      return state;
  }
};

export default TranslationReducer;
