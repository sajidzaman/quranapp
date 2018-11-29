import groupBy from "lodash/groupBy";
import ISO6391 from "iso-639-1";

export const fetchSurahs = props => {
  fetch("http://api.alquran.cloud/surah")
    .then(response => response.json())
    .then(parsedJSON => {
      //console.log(parsedJSON.data);
      const surahOptions = parsedJSON.data.map(function(surah) {
        return {
          value: surah.number,
          label: surah.name,
          numberOfAyahs: surah.numberOfAyahs
        };
      });
      props.dispatch({
        type: "SURAHLIST",
        surahList: surahOptions
      });
    });
};

export const fetchTranslations = props => {
  fetch("http://api.alquran.cloud/edition?format=text&type=translation")
    .then(response => response.json())
    .then(parsedJSON => {
      const translations = groupBy(parsedJSON.data, translation => {
        return translation.language;
      });

      const languageKeys = Object.keys(translations);

      const translationOptions = languageKeys.map(language => {
        let langTranslations = translations[language];
        return {
          label: ISO6391.getNativeName(language),
          options: langTranslations.map(translation => {
            return {
              value: translation.identifier,
              label: translation.name,
              group: ISO6391.getNativeName(language)
            };
          })
        };
      });
      translationOptions.push({
        label: "No Translation",
        options: [
          {
            value: "null",
            label: "No Translation",
            group: "No Translation"
          }
        ]
      });
      //console.log("TranslationOptions", translationOptions);

      props.dispatch({
        type: "TRANSLATIONLIST",
        translationList: translationOptions
      });
    });
};

export const fetchTextEditions = props => {
  fetch("http://api.alquran.cloud/edition?format=text&language=ar&type=quran")
    .then(response => response.json())
    .then(parsedJSON => {
      //console.log("editions", parsedJSON.data);

      const editionList = parsedJSON.data.map(edition => {
        return {
          value: edition.identifier,
          label: edition.name
        };
      });
      props.dispatch({
        type: "EDITIONLIST",
        editionList: editionList
      });
    });
};

export const fetchRecitations = props => {
  fetch(
    "http://api.alquran.cloud/edition?format=audio&type=versebyverse&language=ar"
  )
    .then(response => response.json())
    .then(parsedJSON => {
      const reciterList = parsedJSON.data.map(reciter => {
        return {
          value: reciter.identifier,
          label: reciter.name
        };
      });
      props.dispatch({
        type: "RECITERLIST",
        reciterList: reciterList
      });
      //console.log(parsedJSON.data);
    });
};
