const initialState = {
  selectedSurah: {
    value: 1,
    label: "1",
    numberOfAyahs: 7
  }
};

const SelectedSurahReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "SELECTEDSURAH":
      return { selectedSurah: action.selectedSurah };

    default:
      return state;
  }
};

export default SelectedSurahReducer;
