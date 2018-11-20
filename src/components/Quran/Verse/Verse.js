import React, { Component } from "react";
import "./Verse.css";
class Verse extends Component {
  render() {
    return (
      <div className="Verse text-right heading">
        <div
          key={this.props.ayah.number}
          className={
            +this.props.ayah.numberInSurah === 3
              ? "text-right ayah highlight"
              : "text-right ayah"
          }
          id={"ayah_".concat(this.props.ayah.numberInSurah)}
        >
          {this.props.surah !== 1
            ? this.props.ayah.text
                .replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "")
                .replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "")
                .replace("بسم الله الرحمن الرحيم", "")
                .replace("بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ", "")
            : this.props.ayah.text}
          <div className="ayahContainer">
            <span className="ayahStop">{this.props.ayah.numberInSurah}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Verse;
