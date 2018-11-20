import React, { Component } from "react";
import { connect } from "react-redux";

class Reciter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchRecitations();
  }

  onReciterChangeHandler = event => {
    this.props.dispatch({ type: "AUDIO", audio: event.target.value });
  };

  fetchRecitations() {
    fetch(
      "http://api.alquran.cloud/edition?format=audio&type=versebyverse&language=ar"
    )
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          audios: parsedJSON.data
        });
        //console.log(parsedJSON.data);
      });
  }

  render() {
    if (!this.state.audios) return <p>Loading Audios list ...</p>;
    return (
      <div>
        <h5>Reciter</h5>
        <select
          className="custom-select"
          onChange={this.onReciterChangeHandler}
          value={this.props.audio.audio}
        >
          {this.state.audios.map(function(audio) {
            return (
              <option value={audio.identifier} key={audio.identifier}>
                {audio.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    audio: state.audio
  };
};

export default connect(mapStatesToProps)(Reciter);
