import React, { Component } from "react";
import Top from "./Top/Top";
import TextDisplay from "./TextDisplay/TextDisplay";
import Player from "./Player/Player";
import { connect } from "react-redux";
import { fetchSearchResults } from "../../scripts/searchResults";
import SearchResults from "./SearchResults/SearchResults";

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: false };
  }

  fetchSearchResults = searchText => {
    fetchSearchResults(searchText)
      .then(result => {
        this.setState({
          searchResults: result
        });
      })
      .catch(error => console.log("error in results", error));
  };

  static getDerivedStateFromProps(props, state) {
    if (props.searchText.searchText !== null) {
      return { searchText: props.searchText.searchText, searchResult: true };
    }
    return { searchText: null, searchResult: false };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("this.state", this.state, prevProps);
    if (
      this.state.searchText !== null &&
      this.state.searchText !== prevProps.searchText.searchText
    ) {
      this.fetchSearchResults(this.state.searchText);
    }
  }

  render() {
    if (this.state.searchResult)
      return (
        <SearchResults
          results={this.state.searchResults}
          keyword={this.state.searchText}
        />
      );
    return (
      <div className="m-2 p-3">
        <Top />
        <TextDisplay />
        <Player />
      </div>
    );
  }
}
const mapStatesToProps = state => {
  return {
    searchText: state.searchText
  };
};
export default connect(mapStatesToProps)(RightPanel);
