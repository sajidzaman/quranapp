import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import Verse from "./Verse/Verse";
import Translation from "./Translation/Translation";
import Scrollbar from "react-scrollbars-custom";
import { fetchTranslation } from "../../scripts/translation";
import { fetchSurah } from "../../scripts/surah";
import { adjustScrollbar } from "../../scripts/scrollbar";

class Quran extends Component {
  scrollBar = null;
  constructor(props) {
    super(props);
    this.state = { searchResult: false, translation: null };
  }

  fetchTrans = nextProps => {
    this.setState({
      translation: null
    });
    fetchTranslation(this.props, nextProps).then(translation => {
      this.setState({
        translation: translation
      });
    });
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

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return typeof this._scrollBar !== "undefined" && this._scrollBar !== null
      ? (this.scrollBar = this._scrollBar)
      : this.scrollBar;
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("props", props);
  //   console.log("state", state);
  //   if (props.searchText.searchText !== null) {
  //     return { searchText: props.searchText.searchText, searchResult: true };
  //   }
  //   return null;
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("I am in update");

    if (this.props !== prevProps) {
      this.fetchSurah(this.props);
      this.fetchTrans(this.props);
    }

    if (snapshot !== null) {
      adjustScrollbar(this.scrollBar, this.props, prevProps);
    }
  }

  //TODO: fetch Translation again on verse Range selection

  render() {
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
