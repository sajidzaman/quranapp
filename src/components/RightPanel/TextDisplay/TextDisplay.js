import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import Verse from "../../Quran/Verse/Verse";
import Translation from "../../Quran/Translation/Translation";

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.fetchSurah();
    if (this.props.translation !== null) {
      this.fetchTranslation();
    }
  }
  styles = {
    mainDiv: {
      height: window.innerHeight - 300 + "px",
      direction: "rtl",
      overflowY: "scroll",
      border: 0
    }
  };

  componentWillReceiveProps(nextProps) {
    // console.log(this.props !== nextProps);
    if (this.props !== nextProps) {
      this.setState({
        translation: null,
        surah: null
      });
      this.fetchTranslation(nextProps);
      this.fetchSurah(nextProps);
    }
  }

  fetchTranslation(nextProps) {
    if (
      nextProps &&
      nextProps.translation.translation === null &&
      this.props.translation.translation === null
    )
      return null;
    let surah = this.props.surah.surah;
    let translation = this.props.translation.translation;
    if (nextProps) {
      surah = nextProps.surah.surah;
      translation = nextProps.translation.translation;
    }

    let urlForTranslation =
      "http://api.alquran.cloud/surah/" + surah + "/" + translation;

    fetch(urlForTranslation)
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          translation: parsedJSON.data
        });
        console.log("Translation", parsedJSON.data);
      })
      .catch(error => console.log("parsing failed", error));
  }

  fetchSurah(nextProps) {
    let edition = this.props.edition.edition;
    let surah = this.props.surah.surah;

    if (nextProps) {
      surah = nextProps.surah.surah;
      edition = nextProps.edition.edition;
    }

    let urlForTranslation =
      "http://api.alquran.cloud/surah/" + surah + "/" + edition;

    fetch(urlForTranslation)
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          surah: parsedJSON.data
        });
        //console.log("Surah", parsedJSON.data);
      })
      .catch(error => console.log("parsing failed", error));
  }

  render() {
    //console.log("text Display props", this.props);
    //console.log("translation state", this.state.translation);
    if (!this.state.surah) return <ReactLoading color="green" type="cylon" />;

    return (
      <div style={this.styles.mainDiv}>
        {this.state.surah.ayahs.map(ayah => {
          return (
            <div key={"versecontainer_".concat(ayah.number)}>
              <Verse ayah={ayah} key={"verse_".concat(ayah.number)} />
              {this.props.translation.translation !== null &&
              this.state.translation ? (
                <Translation
                  ayah={this.state.translation.ayahs[ayah.numberInSurah - 1]}
                  language={this.state.translation.edition.language}
                  key={"trans_".concat(ayah.number)}
                />
              ) : this.props.translation.translation === null ? null : (
                <ReactLoading type="bars" color="lightblue" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state in TextDisplay", state);
  return {
    surah: state.surah,
    edition: state.edition,
    chapter: state.chapter,
    translation: state.translation
  };
};
export default connect(mapStateToProps)(TextDisplay);
