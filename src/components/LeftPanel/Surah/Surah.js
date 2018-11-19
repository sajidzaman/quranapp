import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

class Surah extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchSurahs();
  }
  fetchSurahs() {
    fetch("http://api.alquran.cloud/surah")
      .then(response => response.json())
      .then(parsedJSON => {
        //console.log(parsedJSON.data);
        this.setState({
          surahs: parsedJSON.data
        });
      });
  }
  onSurahChangeHandler = event => {
    this.props.dispatch({ type: "SURAH", surah: event.target.value });
    //console.log(event.target.value);
  };
  render() {
    if (!this.state.surahs)
      return <ReactLoading color="green" type="spinningBubbles" />;
    return (
      <div>
        <h5>Surah</h5>
        <select className="custom-select" onChange={this.onSurahChangeHandler}>
          {this.state.surahs.map(function(surah) {
            return (
              <option value={surah.number} key={surah.number}>
                {surah.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default connect()(Surah);
