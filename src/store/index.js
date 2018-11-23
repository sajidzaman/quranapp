import { createStore, combineReducers } from "redux";
import ChapterReducer from "./reducers/ChapterReducer";
import EditionReducer from "./reducers/EditionReducer";
import SurahReducer from "./reducers/SurahReducer";
import TranslationReducer from "./reducers/TranslationReducer";
import ReciterReducer from "./reducers/ReciterReducer";
import VerseRangeReducer from "./reducers/VerseRangeReducer";
import HighlightReducer from "./reducers/HighlightReducer";
import SurahListReducer from "./reducers/SurahListReducer";
import TranslationListReducer from "./reducers/TranslationListReducer";
import EditionListReducer from "./reducers/EditionListReducer";
import ReciterListReducer from "./reducers/ReciterListReducer";
import SelectedSurahReducer from "./reducers/SelectedSurahReducer";
import SearchReducer from "./reducers/SearchReducer";

const rootReducer = combineReducers({
  surahList: SurahListReducer,
  translationList: TranslationListReducer,
  editionList: EditionListReducer,
  reciterList: ReciterListReducer,
  selectedSurah: SelectedSurahReducer,
  searchText: SearchReducer,
  chapter: ChapterReducer,
  edition: EditionReducer,
  surah: SurahReducer,
  translation: TranslationReducer,
  audio: ReciterReducer,
  verseRange: VerseRangeReducer,
  highlight: HighlightReducer
});
const store = createStore(rootReducer);

//console.log("store", store);
export default store;
