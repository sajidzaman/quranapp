const initialState = {
  editionList: null
};

const EditionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDITIONLIST":
      return { editionList: action.editionList };

    default:
      return state;
  }
};

export default EditionListReducer;
