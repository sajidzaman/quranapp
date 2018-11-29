export const fetchTranslation = async (props, nextProps) => {
  let surah = props.surah.surah;
  let translation = props.translation.translation;
  let verseRange = props.verseRange.verseRange;

  if (nextProps) {
    surah = nextProps.surah.surah;
    translation = nextProps.translation.translation;
    verseRange = nextProps.verseRange.verseRange;
  }
  if (translation === null) return null;

  let urlForTranslation =
    "http://api.alquran.cloud/surah/" + surah + "/" + translation;

  if (verseRange[0] !== 0 && verseRange[1] !== 0) {
    let offset = "?offset=".concat(verseRange[0] - 1);
    let limit = "&limit=".concat(verseRange[1] - (verseRange[0] - 1));
    urlForTranslation = urlForTranslation.concat([offset + limit]);
  }

  console.log("urlForTranslation for translation", urlForTranslation);

  let response = await fetch(urlForTranslation);
  let parsedJSON = await response.json();

  return parsedJSON.data;
};
