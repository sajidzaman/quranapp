import React, { Component } from "react";
import Top from "./Top/Top";
import TextDisplay from "./TextDisplay/TextDisplay";
import Player from "./Player/Player";
import { connect } from "react-redux";

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="m-2 p-3">
        <Top />
        <TextDisplay />
        <Player />
      </div>
    );
  }
}

export default connect()(RightPanel);
