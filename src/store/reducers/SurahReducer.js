const initialState = {
  surah: 1
};

const SurahReducer = (state = initialState, action) => {
  // console.log("reducerSurah", state);
  // console.log("ActionSurah", action);
  switch (action.type) {
    case "SURAH":
      return {
        surah: action.surah       
      };

    default:
      return state;
  }
};

export default SurahReducer;
