import React, { Component } from "react";
import { connect } from "react-redux";
import "./Search.css";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    this.props.dispatch({ type: "SEARCH", searchText: this.state.search });
  };
  handleReset = event => {
    this.props.dispatch({ type: "SEARCH", searchText: null });
  };

  render() {
    return (
      <div className="Search">
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search Quranic Text"
        />
        <button
          type="submit"
          className="btn btn-success"
          onClick={this.handleSubmit}
        >
          Search
        </button>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={this.handleReset}
        >
          Reset
        </button>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    searchText: state.searchText
  };
};

export default connect(mapStatesToProps)(Search);
