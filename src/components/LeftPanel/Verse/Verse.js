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
    //console.log("incdm", this.props.selectedSurah.selectedSurah);
    this.fetchSurah();
  }

  componentWillReceiveProps(nextProps) {
    //console.log("in willrecive props verse");
    if (
      this.props.selectedSurah.selectedSurah !==
      nextProps.selectedSurah.selectedSurah
    ) {
      this.fetchSurah(nextProps);
    }
  }

  fetchSurah(nextProps) {
    let selectedSurah = this.props.selectedSurah.selectedSurah;
    if (nextProps) {
      selectedSurah = nextProps.selectedSurah.selectedSurah;
    }

    //console.log("array", Array(selectedSurah.numberOfAyahs).keys());
    const totalAyahs = [...Array(selectedSurah.numberOfAyahs).keys()];

    const verseOptions = totalAyahs.map(ayah => {
      return { value: ayah + 1, label: ayah + 1 };
    });
    //console.log("verseOptions,", verseOptions);
    this.setState({
      verseOptions: verseOptions
    });
  }

  onVerseFromChangeHandler = event => {
    //console.log("in from change handler");
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
    //console.log(this.state.verseRange[0]);
    //console.log("in to change handler");
    this.setState({
      verseRange: [
        this.state.verseRange[0] === 0 ? 1 : this.state.verseRange[0],
        event.value
      ]
    });
    this.props.dispatch({
      type: "AYAHRANGE",
      verseRange: [
        this.state.verseRange[0] === 0 ? 1 : this.state.verseRange[0],
        event.value
      ]
    });
  };

  render() {
    if (!this.props.surahList.surahList)
      return <ReactLoading color="green" type="spinningBubbles" />;
    //console.log("slist", this.props.surahList.surahList);

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
              value={
                this.props.verseRange.verseRange[0] === 0
                  ? this.state.verseOptions[0]
                  : this.state.verseOptions.find(element => {
                      return (
                        element.value === this.props.verseRange.verseRange[0]
                      );
                    })
              }
            />
          </div>
          <div className="col-md-6">
            <Select
              options={this.state.verseOptions}
              placeholder="To"
              onChange={this.onVerseToChangeHandler}
              value={
                this.props.verseRange.verseRange[1] === 0
                  ? this.state.verseOptions[this.state.verseOptions.length - 1]
                  : this.state.verseOptions.find(element => {
                      return (
                        element.value === this.props.verseRange.verseRange[1]
                      );
                    })
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  //console.log("state in versejs", state);
  return {
    surahList: state.surahList,
    surah: state.surah,
    verseRange: state.verseRange,
    selectedSurah: state.selectedSurah
  };
};
export default connect(mapStateToProps)(Verse);
