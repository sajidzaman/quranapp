import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import Verse from "./Verse/Verse";
import Translation from "./Translation/Translation";
import Scrollbar from "react-scrollbars-custom";
import { fetchTranslation } from "../../scripts/translation";
import { fetchSurah } from "../../scripts/surah";

class Quran extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: false, translation: null };
  }

  fetchTrans = nextProps => {
    fetchTranslation(this.props, nextProps).then(translation => {
      console.log("translation state set");
      console.log("translation", translation);
      this.setState({
        translation: translation
      });
    });
    console.log("translation resolved");
  };

  fetchSurah = nextProps => {
    fetchSurah(this.props, nextProps).then(surah => {
      this.setState({
        surah: surah
      });
    });
  };

  componentDidMount() {
    this.fetchSurah();
    if (this.props.translation.translation !== null) {
      this.fetchTrans();
    }
  }

  styles = {
    mainDiv: {
      height: window.innerHeight - 300 + "px",
      direction: "rtl"
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("I am in update");
    if (nextProps.searchText.searchText !== null) {
      this.fetchSearchResults(this.props.searchText.searchText);
    }

    // if (this.props !== nextProps) {
    //   this.fetchSurah(nextProps);
    //   this.fetchTrans(nextProps);
    // }

    // if (this.props.edition.edition !== nextProps.edition.edition) {
    // }

    console.log(this.props, nextProps);

    if (this.props !== nextProps) {
      if (this.props.surah.surah !== nextProps.surah.surah) {
        this.setState({
          surah: null
        });
        this.fetchSurah(nextProps);
        if (
          nextProps.translation.translation !== null &&
          nextProps.translation.translation !== "null"
        ) {
          this.fetchTrans(nextProps);
        }
      }
      if (
        this.props.translation.translation !== nextProps.translation.translation
      ) {
        if (
          nextProps.translation.translation !== null &&
          nextProps.translation.translation !== "null"
        ) {
          console.log("calling fetchtrans");
          this.fetchTrans(nextProps);
        }
      }
      if (
        this.props.verseRange.verseRange !== nextProps.verseRange.verseRange
      ) {
        this.fetchSurah(nextProps);
        if (
          nextProps.translation.translation !== null &&
          nextProps.translation.translation !== "null"
        ) {
          this.fetchTrans(nextProps);
        }
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

  render() {
    //console.log("text Display props", this.props);

    if (!this.state.surah) return <ReactLoading color="green" type="cylon" />;
    let showTranslation = false;
    if (this.props.translation.translation !== null) showTranslation = true;
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
          console.log(
            "showTranslation",
            showTranslation,
            this.state.translation
          );
          console.log(
            "showTranslation && state.translation",
            !showTranslation && !this.state.translation
          );
          return (
            <div key={"versecontainer_".concat(ayah.number)}>
              <Verse
                ayah={ayah}
                key={"verse_".concat(ayah.number)}
                surah={this.state.surah.number}
              />
              {showTranslation && this.state.translation !== null ? (
                <Translation
                  ayah={this.state.translation.ayahs[index]}
                  language={this.state.translation.edition.language}
                  key={"trans_".concat(ayah.number)}
                />
              ) : this.state.translation === null ? null : (
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
  console.log("state in Quran", state);
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
export default connect(mapStateToProps)(Quran);
