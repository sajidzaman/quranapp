export const fetchSurah = async (props, nextProps) => {
  console.log("props in fetchsurah", props);
  let edition = props.edition.edition;
  let surah = props.surah.surah;
  let verseRange = props.verseRange.verseRange;

  if (nextProps) {
    surah = nextProps.surah.surah;
    edition = nextProps.edition.edition;
    verseRange = nextProps.verseRange.verseRange;
  }

  let urlForSurah = "http://api.alquran.cloud/surah/" + surah + "/" + edition;

  console.log("verseRange in Surah", verseRange);

  if (verseRange[0] !== 0 && verseRange[1] !== 0) {
    let offset = "?offset=".concat(verseRange[0] - 1);
    let limit = "&limit=".concat(verseRange[1] - (verseRange[0] - 1));
    urlForSurah = urlForSurah.concat([offset + limit]);
  }

  let response = await fetch(urlForSurah);
  let parsedJSON = await response.json();
  return parsedJSON.data;
};
