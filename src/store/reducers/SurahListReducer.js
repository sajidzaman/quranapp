const initialState = {
  surahList: null
};

const SurahListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SURAHLIST":
      return {
        surahList: action.surahList
      };

    default:
      return state;
  }
};

export default SurahListReducer;
