import React, { Component } from "react";
import "./Verse.css";
import { connect } from "react-redux";
import processString from "react-process-string";
import ReactHintFactory from "react-hint";
import "react-hint/css/index.css";

const ReactHint = ReactHintFactory(React);

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
    let tajweedRules = [
      {
        identifier: "h",
        description: "Hamzat ul Wasl"
      },
      {
        identifier: "s",
        description: "Silent"
      },
      {
        identifier: "l",
        description: "Lam Shamsiyyah"
      },
      {
        identifier: "n",
        description: "Normal Prolongation: 2 Vowels"
      },
      {
        identifier: "p",
        description: "Permissible Prolongation: 2, 4, 6 Vowels"
      },
      {
        identifier: "q",
        description: "Qalaqah"
      },
      {
        identifier: "o",
        description: "Obligatory Prolongation: 4-5 Vowels"
      },
      {
        identifier: "c",
        description: "Ikhafa' Shafawi - With Meem"
      },
      {
        identifier: "f",
        description: "Ikhafa'"
      },
      {
        identifier: "w",
        description: "Idgham Shafawi - With Meem"
      },
      {
        identifier: "i",
        description: "Iqlab"
      },
      {
        identifier: "a",
        description: "Idgham - With Ghunnah"
      },
      {
        identifier: "u",
        description: "Idgham - Without Ghunnah"
      },
      {
        identifier: "d",
        description: "Idgham - Mutajanisayn"
      },
      {
        identifier: "b",
        description: "Idgham - Mutaqaribayn"
      },
      {
        identifier: "g",
        description: "Ghunnah: 2 Vowels"
      }
    ];
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
        return null;
      });
      // console.log(ayahText);
      ayah = (
        <div className="wordbywordContainer">
          {this.jsxJoin(ayahText, <span />)}
        </div>
      );
      //ayah = ayahText.join();
    } else if (this.props.edition.edition === "quran-tajweed") {
      ayah = this.props.ayah.text;
      let config = [
        {
          regex: /\[(\w+)[^[]*\[(.*?)\]/g,
          fn: (key, result) => {
            let rule = tajweedRules.filter(
              elem => elem.identifier === result[1]
            );
            return (
              <span key={key}>
                <span
                  className={result[1]}
                  data-rh={
                    rule.length > 0
                      ? rule[0].description
                      : "Description not found"
                  }
                  data-rh-at="top"
                >
                  {result[2]}
                </span>
              </span>
            );
          }
        }
      ];
      ayah = processString(config)(ayah);
    } else {
      ayah = this.props.ayah.text;
    }
    return (
      <div className="Verse text-right heading">
        <ReactHint events delay={100} />
        <div
          key={this.props.ayah.number}
          className="text-right ayah"
          id={"ayah_".concat(this.props.ayah.number)}
        >
          {this.props.surah !== 1 &&
          (this.props.edition.edition !== "quran-wordbyword" &&
            this.props.edition.edition !== "quran-tajweed")
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
