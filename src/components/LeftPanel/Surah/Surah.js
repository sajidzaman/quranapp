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

  componentDidMount() {}

  onSurahChangeHandler = event => {
    //console.log(event);
    let selectedSurah = this.props.surahList.surahList.find(
      element => element.value === event.value
    );
    this.props.dispatch({
      type: "SELECTEDSURAH",
      selectedSurah: selectedSurah
    });
    console.log("selectedSurah", selectedSurah);
    this.props.dispatch({ type: "SURAH", surah: selectedSurah.value });
    this.props.dispatch({ type: "AYAHRANGE", verseRange: [0, 0] });
  };
  render() {
    if (!this.props.surahList.surahList)
      return <ReactLoading color="green" type="spinningBubbles" />;

    return (
      <div className="Surah">
        <h5>Surah</h5>
        <Select
          options={this.props.surahList.surahList}
          onChange={this.onSurahChangeHandler}
          className="surahName text-right"
          placeholder="Select Surah"
          isRtl={true}
          defaultValue={this.props.surahList.surahList[0]}
          value={this.props.surahList.surahList.find(
            element => element.value === this.props.surah.surah
          )}
        />
      </div>
    );
  }
}
const mapStatesToProps = state => {
  return {
    surahList: state.surahList,
    surah: state.surah,
    selectedSurah: state.selectedSurah,
    verseRange: state.verseRange
  };
};
export default connect(mapStatesToProps)(Surah);
