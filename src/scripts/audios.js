export const fetchAudios = async (props, nextProps) => {
  let audio = props.audio.audio,
    surah = props.surah.surah,
    verseRange = props.verseRange.verseRange;
  if (nextProps) {
    audio = nextProps.audio.audio;
    surah = nextProps.surah.surah;
    verseRange = nextProps.verseRange.verseRange;
  }

  let urlForAudio = "http://api.alquran.cloud/surah/" + surah + "/" + audio;

  if (verseRange[0] !== 0 && verseRange[1] !== 0) {
    let offset = "?offset=".concat(verseRange[0] - 1);
    let limit = "&limit=".concat(verseRange[1] - (verseRange[0] - 1));
    urlForAudio = urlForAudio.concat([offset + limit]);
  }

  let response = await fetch(urlForAudio);
  let parsedJSON = await response.json();
  const audios = parsedJSON.data.ayahs.map(ayah => {
    return {
      url: ayah.audio,
      title:
        parsedJSON.data.englishName + " [ Ayah " + ayah.numberInSurah + "]",
      ayah: ayah.numberInSurah
    };
  });
  return audios;
};
