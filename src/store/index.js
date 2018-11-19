import { createStore, combineReducers } from "redux";
import ChapterReducer from "./reducers/ChapterReducer";
import EditionReducer from "./reducers/EditionReducer";
import SurahReducer from "./reducers/SurahReducer";
import TranslationReducer from "./reducers/TranslationReducer";

const rootReducer = combineReducers({
  chapter: ChapterReducer,
  edition: EditionReducer,
  surah: SurahReducer,
  translation: TranslationReducer
});
const store = createStore(rootReducer);

//console.log("store", store);
export default store;
