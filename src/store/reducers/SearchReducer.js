const initialState = {
  searchText: null
};

const SearchReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "SEARCH":
      return {
        searchText: action.searchText
      };

    default:
      return state;
  }
};

export default SearchReducer;
