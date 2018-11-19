const initialState = {
  chapter: 1
};

const ChapterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHAPTER":
      return {
        chapter: action.chapter
      };

    default:
      return state;
  }
};

export default ChapterReducer;
