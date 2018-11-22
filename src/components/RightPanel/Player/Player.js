import React, { Component } from "react";
import { connect } from "react-redux";
import AudioPlayer from "react-responsive-audio-player";
import ReactLoading from "react-loading";
import "../../../../node_modules/react-responsive-audio-player/dist/audioplayer.css";
//WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
//TODO: load the audios based on the selection
//fetch the audios
//play the audio files

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.fetchAudios();
  }
  fetchAudios(nextProps) {
    let audio = this.props.audio.audio,
      surah = this.props.surah.surah,
      verseRange = this.props.verseRange.verseRange;
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

    fetch(urlForAudio)
      .then(response => response.json())
      .then(parsedJSON => {
        const audios = parsedJSON.data.ayahs.map(ayah => {
          return {
            url: ayah.audio,
            title:
              parsedJSON.data.englishName +
              " [ Ayah " +
              ayah.numberInSurah +
              "]",
            ayah: ayah.numberInSurah
          };
        });
        console.log(audios);
        this.setState({
          audioFiles: audios
        });
      });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.audio.audio !== nextProps.audio.aduio) {
        this.setState({ audioFiles: null });
        this.fetchAudios(nextProps);
      }
    }
  }

  onMediaChangeHandler = event => {
    let src = event.target.attributes["src"].value;
    let splittedSrc = src.split("/");
    console.log(splittedSrc[splittedSrc.length - 1]);
    this.props.dispatch({
      type: "AYAHTOHIGHLIGHT",
      highlight: splittedSrc[splittedSrc.length - 1]
    });
  };

  render() {
    if (!this.state.audioFiles)
      return <ReactLoading type="bubbles" color="black" />;
    return (
      <div>
        <AudioPlayer
          playlist={this.state.audioFiles}
          controls={["playpause", "forwardskip", "progressdisplay"]}
          autoplay={false}
          autoplayDelayInSeconds={2.1}
          onMediaEvent={{ play: this.onMediaChangeHandler }}
        />
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    surah: state.surah,
    audio: state.audio,
    verseRange: state.verseRange
  };
};

export default connect(mapStatesToProps)(Player);
