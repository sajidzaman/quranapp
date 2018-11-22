const initialState = {
  highlight: 1
};

const HighlightReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "AYAHTOHIGHLIGHT":
      return {
        highlight: action.highlight
      };

    default:
      return state;
  }
};

export default HighlightReducer;
