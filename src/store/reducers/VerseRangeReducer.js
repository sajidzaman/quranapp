const initialState = {
  verseRange: [0, 0]
};

const VerseRangeReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "AYAHRANGE":
      return {
        verseRange: action.verseRange
      };

    default:
      return state;
  }
};

export default VerseRangeReducer;
