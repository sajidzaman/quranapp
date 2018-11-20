import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Select from "react-select";
import "./Surah.css";

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
        const surahOptions = parsedJSON.data.map(function(surah) {
          return { value: surah.number, label: surah.name };
        });
        this.setState({
          surahs: surahOptions
        });
      });
  }
  onSurahChangeHandler = event => {
    this.props.dispatch({ type: "SURAH", surah: event.value });
    this.props.dispatch({ type: "AYAHRANGE", verseRange: [0, 0] });
    //console.log(event);
  };
  render() {
    if (!this.state.surahs)
      return <ReactLoading color="green" type="spinningBubbles" />;
    return (
      <div className="Surah">
        <h5>Surah</h5>
        <Select
          options={this.state.surahs}
          onChange={this.onSurahChangeHandler}
          className="surahName text-right"
          placeholder="Select Surah"
          isRtl={true}
          defaultValue={this.state.surahs[0]}
        />
      </div>
    );
  }
}

export default connect()(Surah);
