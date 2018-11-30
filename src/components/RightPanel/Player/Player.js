import React, { Component } from "react";
import { connect } from "react-redux";
import AudioPlayer from "react-responsive-audio-player";
import ReactLoading from "react-loading";
import { fetchAudios } from "../../../scripts/audios";
import "../../../../node_modules/react-responsive-audio-player/dist/audioplayer.css";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { surah: props.surah.surah };
  }
  fetchAudios = nextProps => {
    fetchAudios(this.props, nextProps).then(audioFiles => {
      this.setState({
        audioFiles: audioFiles
      });
    });
  };
  componentDidMount() {
    this.fetchAudios();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.surah.surah !== state.surah) {
      return { surah: props.surah.surah, audioFiles: null };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.surah.surah !== this.props.surah.surah) {
      this.fetchAudios(this.props);
    }
    if (prevProps.audio.audio !== this.props.audio.audio) {
      this.setState({
        audioFiles: null
      });
      this.fetchAudios(this.props);
    }
  }

  onMediaChangeHandler = event => {
    let src = event.target.attributes["src"].value;
    let splittedSrc = src.split("/");
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
