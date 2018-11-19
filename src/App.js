import React, { Component } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";

class App extends Component {
  styles = {
    marginLeft: 0,
    marginRight: 0
  };
  render() {
    return (
      <div className="row" style={this.styles}>
        <div className="col-md-3 p-2">
          <LeftPanel />
        </div>
        <div className="col-md-9 p-2">
          <RightPanel />
        </div>
      </div>
    );
  }
}

export default App;
