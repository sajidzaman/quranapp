import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import Verse from "../../Quran/Verse/Verse";
import Translation from "../../Quran/Translation/Translation";
import Scrollbar from "react-scrollbars-custom";

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: false };
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
      direction: "rtl"
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText.searchText !== null) {
      this.fetchSearchResults(this.props.searchText.searchText);
    }

    console.log(this.props, nextProps);
    if (this.props !== nextProps) {
      if (this.props.edition.edition !== nextProps.edition.edition) {
        this.fetchSurah(nextProps);
      }
      if (this.props.surah.surah !== nextProps.surah.surah) {
        this.setState({
          surah: null
        });
        this.fetchSurah(nextProps);
        this.fetchTranslation(nextProps);
      }
      if (
        this.props.translation.translation !== nextProps.translation.translation
      ) {
        this.setState({
          translation: null
        });
        this.fetchTranslation(nextProps);
      }
      if (
        this.props.verseRange.verseRange !== nextProps.verseRange.verseRange
      ) {
        this.fetchSurah(nextProps);
        this.fetchTranslation(nextProps);
      }
    }

    if (this._scrollBar !== null) {
      console.log(this._scrollBar.getScrollValues());

      if (nextProps.highlight.highlight > this.props.highlight.highlight) {
        console.log(this._scrollBar.getScrollValues());

        let scrollValue = this._scrollBar.getScrollValues().scrollTop;

        const ayahDiv = document.getElementById(
          "ayah_".concat(this.props.highlight.highlight)
        );
        const transDiv = document.getElementById(
          "trans_ayah_".concat(this.props.highlight.highlight)
        );

        const ayahDivHeight = ayahDiv !== null ? ayahDiv.offsetHeight : 0;
        const transDivHeight = transDiv !== null ? transDiv.offsetHeight : 0;

        scrollValue += ayahDivHeight + transDivHeight;
        console.log(ayahDivHeight, transDivHeight, scrollValue);

        this._scrollBar.scrollTo(scrollValue);
      }
      if (nextProps.highlight.highlight < this.props.highlight.highlight) {
        console.log("here");
        this._scrollBar.scrollTo(0);
      }
    }
  }

  fetchSearchResults(searchText) {
    this.setState({
      searchResult: true
    });
    fetch("http://api.alquran.cloud/search/" + searchText + "/all/en")
      .then(response => response.json())
      .then(parsedJSON => {
        console.log("searchResults", parsedJSON.data);

        this.setState({
          searchResults: parsedJSON.data
        });
      })
      .catch(error => console.log(error, "Error occured"));
  }
  //TODO: fetch Translation again on verse Range selection
  fetchTranslation(nextProps) {
    console.log("nextProps in fetchTranslation", nextProps);
    console.log("props in fetchTranslation", this.props);
    if (nextProps) {
      if (
        nextProps.translation.translation === null ||
        nextProps.translation.translation === "null"
      )
        this.props.dispatch({ type: "TRANSLATION", translation: null });
    } else {
      if (this.props.translation.translation === null) return null;
    }

    let surah = this.props.surah.surah;
    let translation = this.props.translation.translation;
    let verseRange = this.props.verseRange.verseRange;
    if (nextProps) {
      surah = nextProps.surah.surah;
      translation = nextProps.translation.translation;
      verseRange = nextProps.verseRange.verseRange;
    }

    let urlForTranslation =
      "http://api.alquran.cloud/surah/" + surah + "/" + translation;

    console.log("verseRange in text Display", verseRange);

    if (verseRange[0] !== 0 && verseRange[1] !== 0) {
      let offset = "?offset=".concat(verseRange[0] - 1);
      let limit = "&limit=".concat(verseRange[1] - (verseRange[0] - 1));
      urlForTranslation = urlForTranslation.concat([offset + limit]);
    }

    console.log("urlForTranslation for translation", urlForTranslation);

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
    let verseRange = this.props.verseRange.verseRange;

    if (nextProps) {
      surah = nextProps.surah.surah;
      edition = nextProps.edition.edition;
      verseRange = nextProps.verseRange.verseRange;
    }

    let urlForTranslation =
      "http://api.alquran.cloud/surah/" + surah + "/" + edition;

    console.log("verseRange in Surah", verseRange);

    if (verseRange[0] !== 0 && verseRange[1] !== 0) {
      let offset = "?offset=".concat(verseRange[0] - 1);
      let limit = "&limit=".concat(verseRange[1] - (verseRange[0] - 1));
      urlForTranslation = urlForTranslation.concat([offset + limit]);
    }
    //console.log(urlForTranslation);

    fetch(urlForTranslation)
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          surah: parsedJSON.data
        });
        // this.props.dispatch({
        //   type: "AYAHTOHIGHLIGHT",
        //   highlight: parsedJSON.data.ayahs[0].number
        // });
        //console.log("Surah", parsedJSON.data);
      })
      .catch(error => console.log("parsing failed", error));
  }

  render() {
    //console.log("text Display props", this.props);
    //console.log("translation state", this.state.translation);
    if (!this.state.surah) return <ReactLoading color="green" type="cylon" />;
    if (this.state.searchResult) {
      if (!this.state.searchResults) {
        return <ReactLoading color="green" type="cylon" />;
      } else {
        return (
          <Scrollbar
            style={this.styles.mainDiv}
            rtl={true}
            noScrollX={true}
            scrollTop={0}
            ref={scrollBar => {
              this._scrollBar = scrollBar;
            }}
          >
            <div> Total Results Found: {this.state.searchResults.count}</div>
            {this.state.searchResults.matches.map(match => {
              return <div>{match.text}</div>;
            })}
          </Scrollbar>
        );
      }
    }

    return (
      <Scrollbar
        style={this.styles.mainDiv}
        rtl={true}
        noScrollX={true}
        scrollTop={0}
        ref={scrollBar => {
          this._scrollBar = scrollBar;
        }}
      >
        {this.state.surah.ayahs.map((ayah, index) => {
          return (
            <div key={"versecontainer_".concat(ayah.number)}>
              <Verse
                ayah={ayah}
                key={"verse_".concat(ayah.number)}
                surah={this.state.surah.number}
              />
              {this.state.translation ? (
                <Translation
                  ayah={this.state.translation.ayahs[index]}
                  language={this.state.translation.edition.language}
                  key={"trans_".concat(ayah.number)}
                />
              ) : this.props.translation.translation === null ? null : (
                <ReactLoading type="bars" color="lightblue" />
              )}
            </div>
          );
        })}
      </Scrollbar>
    );
  }
}

const mapStateToProps = state => {
  console.log("state in TextDisplay", state);
  return {
    surah: state.surah,
    edition: state.edition,
    chapter: state.chapter,
    translation: state.translation,
    verseRange: state.verseRange,
    highlight: state.highlight,
    searchText: state.searchText
  };
};
export default connect(mapStateToProps)(TextDisplay);
