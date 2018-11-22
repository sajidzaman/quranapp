import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

class Reciter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onReciterChangeHandler = event => {
    this.props.dispatch({ type: "AUDIO", audio: event.value });
  };

  render() {
    if (!this.props.reciterList.reciterList)
      return <p>Loading Audios list ...</p>;

    return (
      <div>
        <h5>Reciter</h5>
        <Select
          options={this.props.reciterList.reciterList}
          onChange={this.onReciterChangeHandler}
          value={this.props.reciterList.reciterList.find(
            element => element.value === this.props.audio.audio
          )}
        />
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    audio: state.audio,
    reciterList: state.reciterList
  };
};

export default connect(mapStatesToProps)(Reciter);
