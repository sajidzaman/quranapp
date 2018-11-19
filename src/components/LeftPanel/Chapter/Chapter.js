import React, { Component } from "react";
import { connect } from "react-redux";

class Chapter extends Component {
  onChangeHandler = event => {
    this.props.dispatch({ type: "CHAPTER", chapter: event.target.value });
  };
  render() {
    //console.log("chapter in ChapterJS", this.props.chapter);
    let totalChapters = [];
    totalChapters = [...Array(30).keys()];
    return (
      <div>
        <h5>Chapters</h5>
        <select className="custom-select" onChange={this.onChangeHandler}>
          {totalChapters.map(function(chapter) {
            return (
              <option value={chapter + 1} key={chapter}>
                Chapter {chapter + 1}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default connect()(Chapter);
