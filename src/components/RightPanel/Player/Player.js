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
      surah = this.props.surah.surah;
    if (nextProps) {
      audio = nextProps.audio.audio;
      surah = nextProps.surah.surah;
    }
    fetch("http://api.alquran.cloud/surah/" + surah + "/" + audio)
      .then(response => response.json())
      .then(parsedJSON => {
        const audios = parsedJSON.data.ayahs.map(ayah => {
          return {
            url: ayah.audio,
            title: parsedJSON.data.name + "Ayah " + ayah.numberInSurah
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
      this.setState({ audioFiles: null });
      this.fetchAudios(nextProps);
    }
  }

  onMediaChangeHandler = info => {
    console.log(info);
  }

  render() {
    if (!this.state.audioFiles)
      return <ReactLoading type="bubbles" color="black" />;
    return <div>
        <AudioPlayer playlist={this.state.audioFiles} controls={["playpause", "forwardskip", "progressdisplay"]} autoplay={true} autoplayDelayInSeconds={2.1} onMediaEvent={{play : this.onMediaChangeHandler}} />
      </div>;
  }
}

const mapStatesToProps = state => {
  return {
    surah: state.surah,
    audio: state.audio
  };
};

export default connect(mapStatesToProps)(Player);
