import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Select from "react-select";

class TextEditions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onEditionChangeHandler = event => {
    this.props.dispatch({ type: "EDITION", edition: event.value });
  };
  render() {
    if (!this.props.editionList.editionList)
      return <ReactLoading color="green" type="spinningBubbles" />;
    return (
      <div className="editions">
        <h5>Editions</h5>
        <Select
          options={this.props.editionList.editionList}
          onChange={this.onEditionChangeHandler}
          value={this.props.editionList.editionList.find(
            element => element.value === this.props.edition.edition
          )}
        />
      </div>
    );
  }
}
const mapStatesToProps = state => {
  return {
    editionList: state.editionList,
    edition: state.edition
  };
};

export default connect(mapStatesToProps)(TextEditions);
