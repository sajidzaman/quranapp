const initialState = {
  audio: "ar.alafasy"
};

const ReciterReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "AUDIO":
      return {
        audio: action.audio
      };

    default:
      return state;
  }
};

export default ReciterReducer;
