import React, { Component } from "react";

class Reciter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchTranslations();
  }

  fetchTranslations() {
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
        <select className="custom-select">
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

export default Reciter;
