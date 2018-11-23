import React, { Component } from "react";
import "./Verse.css";
import { connect } from "react-redux";
class Verse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let currentAyah = document.getElementById(
      "ayah_".concat(this.props.highlight.highlight)
    );
    if (currentAyah !== null && currentAyah.className === "text-right ayah") {
      currentAyah.className = "text-right ayah highlight";
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log("currentrops", this.props);
    // console.log("nextProps", nextProps);
    if (this.props.highlight.highlight !== nextProps.highlight.highlight) {
      let prevAyah = document.getElementById(
        "ayah_".concat(this.props.highlight.highlight)
      );
      if (
        prevAyah !== null &&
        prevAyah.className === "text-right ayah highlight"
      ) {
        prevAyah.className = "text-right ayah";
      }
      let currentAyah = document.getElementById(
        "ayah_".concat(nextProps.highlight.highlight)
      );
      if (currentAyah !== null && currentAyah.className === "text-right ayah") {
        currentAyah.className = "text-right ayah highlight";
      }
    }
  }
  jsxJoin = (array, str) => {
    return array.length > 0
      ? array.reduce((result, item) => (
          <React.Fragment>
            {result}
            {str}
            {item}
          </React.Fragment>
        ))
      : null;
  };
  render() {
    let ayah = null;
    if (this.props.edition.edition === "quran-wordbyword") {
      let ayahText = [];
      let splittedAyah = this.props.ayah.text.split("$");
      ayahText = splittedAyah.map(ayahWords => {
        let ayahWord = ayahWords.split("|");
        if (ayahWord[0] !== "") {
          return (
            <div className="text-center ayahWord">
              {ayahWord[0]} <br /> {ayahWord[1]}
            </div>
          );
        }
      });
      console.log(ayahText);
      ayah = (
        <div className="wordbywordContainer">
          {this.jsxJoin(ayahText, <span />)}
        </div>
      );
      //ayah = ayahText.join();
    } else {
      ayah = this.props.ayah.text;
    }
    return (
      <div className="Verse text-right heading">
        <div
          key={this.props.ayah.number}
          className="text-right ayah"
          id={"ayah_".concat(this.props.ayah.number)}
        >
          {this.props.surah !== 1 &&
          this.props.edition.edition !== "quran-wordbyword"
            ? ayah
                .replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "")
                .replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "")
                .replace("بسم الله الرحمن الرحيم", "")
                .replace("بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ", "")
            : ayah}

          <div className="ayahContainer">
            <span className="ayahStop">{this.props.ayah.numberInSurah}</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStatesToProps = state => {
  return {
    highlight: state.highlight,
    edition: state.edition
  };
};

export default connect(mapStatesToProps)(Verse);
