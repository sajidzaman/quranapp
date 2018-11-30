import React, { Component } from "react";
import ReactLoading from "react-loading";
import Scrollbar from "react-scrollbars-custom";
import "./SearchResults.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  styles = {
    mainDiv: {
      height: window.innerHeight - 100 + "px",
      direction: "rtl"
    }
  };
  render() {
    if (!this.props.results) return <ReactLoading type="cylon" color="green" />;
    console.log(this.props.results);
    return (
      <div className="SearchResults">
        <div className="top">
          <h3>
            {this.props.results.count} Search Results found for keyword{" "}
            {this.props.keyword}
          </h3>
        </div>
        <Scrollbar
          style={this.styles.mainDiv}
          rtl={false}
          noScrollX={true}
          scrollTop={0}
          ref={scrollBar => {
            this._scrollBar = scrollBar;
          }}
        >
          <div className="searchResults">
            {this.props.results.matches.map((result, index) => {
              return (
                <div key={index} className="result">
                  <h5>Edition: {result.edition.name}</h5>
                  <p className="surah">
                    {" "}
                    Surah: {result.surah.name} Ayah: {result.numberInSurah}
                  </p>
                  <p className="text"> {result.text}</p>
                </div>
              );
            })}
          </div>
        </Scrollbar>
      </div>
    );
  }
}

export default SearchResults;
