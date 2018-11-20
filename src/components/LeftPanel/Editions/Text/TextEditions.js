import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

class TextEditions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.fetchTextEditions();
  }
  fetchTextEditions() {
    fetch("http://api.alquran.cloud/edition?format=text&language=ar&type=quran")
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          editions: parsedJSON.data
        });
        //console.log(parsedJSON.data);
      });
  }
  onEditionChangeHandler = event => {
    this.props.dispatch({ type: "EDITION", edition: event.target.value });
  };
  render() {
    if (!this.state.editions)
      return <ReactLoading color="green" type="spinningBubbles" />;
    return (
      <div className="editions">
        <h5>Editions</h5>
        <select
          className="custom-select"
          onChange={this.onEditionChangeHandler}
        >
          {this.state.editions.map(function(edition) {
            return (
              <option value={edition.identifier} key={edition.identifier}>
                {edition.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default connect()(TextEditions);
