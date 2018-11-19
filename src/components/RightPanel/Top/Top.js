import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.fetchSurah();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        surah: null
      });
      this.fetchSurah(nextProps);
    }
  }
  styles = {
    surahName: {
      direction: "rtl",
      fontFamily: "Lateef",
      fontSize: 65,
      color: "green"
    }
  };
  fetchSurah(nextProps) {
    let edition = this.props.edition.edition,
      surah = this.props.surah.surah;

    if (nextProps) {
      edition = nextProps.edition.edition;
      surah = nextProps.surah.surah;
    }

    fetch("http://api.alquran.cloud/surah/" + surah + "/" + edition)
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          surah: parsedJSON.data
        });
        //console.log(parsedJSON.data);
      })
      .catch(error => console.log("parsing failed", error));
  }
  render() {
    if (!this.state.surah) return <ReactLoading color="green" type="cylon" />;
    //console.log(this.state.surah.name);
    return (
      <div className="row">
        <div className="col-md-4">
          <h4 className="text-left" style={this.styles.surahName}>
            {this.state.surah.englishName}
          </h4>
        </div>

        <div className="col-md-4">
          <h4 className="text-center">
            {this.state.surah.number} - {this.state.surah.revelationType} -{" "}
            {this.state.surah.numberOfAyahs}
          </h4>
        </div>
        <div className="col-md-4">
          <h4 className="text-right" style={this.styles.surahName}>
            {this.state.surah.name}
          </h4>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    surah: state.surah,
    edition: state.edition,
    chapter: state.chapter,
    translation: state.translation
  };
};

export default connect(mapStatesToProps)(Top);
