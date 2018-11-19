import React, { Component } from "react";

class Verse extends Component {
  render() {
    return (
      <div>
        <h5>Verse</h5>
        <select className="custom-select">
          <option value="1"> 1</option>
          <option value="2"> 2</option>
          <option value="3"> 3</option>
          <option value="4"> 4</option>
        </select>
      </div>
    );
  }
}

export default Verse;
