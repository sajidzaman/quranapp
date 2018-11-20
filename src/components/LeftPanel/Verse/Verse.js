import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Select from "react-select";
import "./Verse.css";

class Verse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verseRange: this.props.verseRange.verseRange
    };
  }
  componentDidMount() {
    this.fetchSurah();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log("nextProps", nextProps.verseRange.verseRange[0] === 0);
      if (nextProps.surah.surah !== this.props.surah.surah) {
        this.setState({
          verseOptions: null
        });
      }
      this.fetchSurah(nextProps);
    }
  }

  fetchSurah(nextProps) {
    let surah = this.props.surah.surah;
    if (nextProps) surah = nextProps.surah.surah;

    fetch("http://api.alquran.cloud/surah/" + surah)
      .then(response => response.json())
      .then(parsedJSON => {
        //console.log(parsedJSON.data);
        const verseOptions = parsedJSON.data.ayahs.map(ayah => {
          return {
            value: ayah.numberInSurah,
            label: ayah.numberInSurah
          };
        });

        this.setState({
          verseOptions: verseOptions
        });
      });
  }

  onVerseFromChangeHandler = event => {
    let verseRange = this.state.verseOptions.length;
    if (this.state.verseRange[1] !== 0) {
      verseRange = this.state.verseRange[1];
    }
    this.setState({
      verseRange: [event.value, verseRange]
    });
    this.props.dispatch({
      type: "AYAHRANGE",
      verseRange: [event.value, verseRange]
    });
  };

  onVerseToChangeHandler = event => {
    this.setState({
      verseRange: [this.state.verseRange[0], event.value]
    });
    this.props.dispatch({
      type: "AYAHRANGE",
      verseRange: [this.state.verseRange[0], event.value]
    });
  };

  render() {
    if (!this.state.verseOptions)
      return <ReactLoading type="bars" color="green" />;
    return (
      <div className="Verse">
        <h5>Verse</h5>
        <div className="row">
          <div className="col-md-6">
            <Select
              options={this.state.verseOptions}
              placeholder="From"
              onChange={this.onVerseFromChangeHandler}
              defaultValue={this.state.verseOptions[0]}
            />
          </div>
          <div className="col-md-6">
            <Select
              options={this.state.verseOptions}
              placeholder="To"
              onChange={this.onVerseToChangeHandler}
              defaultValue={
                this.state.verseOptions[this.state.verseOptions.length - 1]
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    surah: state.surah,
    verseRange: state.verseRange
  };
};
export default connect(mapStateToProps)(Verse);
