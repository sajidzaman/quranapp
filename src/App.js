import React, { Component } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import { connect } from "react-redux";
import groupBy from "lodash/groupBy";
//import uniqBy from "lodash/uniqBy";
import ISO6391 from "iso-639-1";

class App extends Component {
  styles = {
    marginLeft: 0,
    marginRight: 0
  };

  componentWillMount() {
    this.fetchSurahs();
    this.fetchTranslations();
    this.fetchTextEditions();
    this.fetchRecitations();
  }
  componentDidMount() {}

  fetchSurahs() {
    fetch("http://api.alquran.cloud/surah")
      .then(response => response.json())
      .then(parsedJSON => {
        //console.log(parsedJSON.data);
        const surahOptions = parsedJSON.data.map(function(surah) {
          return {
            value: surah.number,
            label: surah.name,
            numberOfAyahs: surah.numberOfAyahs
          };
        });
        this.props.dispatch({
          type: "SURAHLIST",
          surahList: surahOptions
        });
      });
  }

  fetchTranslations() {
    fetch("http://api.alquran.cloud/edition?format=text&type=translation")
      .then(response => response.json())
      .then(parsedJSON => {
        const translations = groupBy(parsedJSON.data, translation => {
          return translation.language;
        });

        const languageKeys = Object.keys(translations);

        const translationOptions = languageKeys.map(language => {
          let langTranslations = translations[language];
          return {
            label: ISO6391.getNativeName(language),
            options: langTranslations.map(translation => {
              return {
                value: translation.identifier,
                label: translation.name,
                group: ISO6391.getNativeName(language)
              };
            })
          };
        });
        translationOptions.push({
          label: "No Translation",
          options: [
            {
              value: "null",
              label: "No Translation",
              group: "No Translation"
            }
          ]
        });
        //console.log("TranslationOptions", translationOptions);

        this.props.dispatch({
          type: "TRANSLATIONLIST",
          translationList: translationOptions
        });
      });
  }

  fetchTextEditions() {
    fetch("http://api.alquran.cloud/edition?format=text&language=ar&type=quran")
      .then(response => response.json())
      .then(parsedJSON => {
        //console.log("editions", parsedJSON.data);

        const editionList = parsedJSON.data.map(edition => {
          return {
            value: edition.identifier,
            label: edition.name
          };
        });
        this.props.dispatch({
          type: "EDITIONLIST",
          editionList: editionList
        });
      });
  }

  fetchRecitations() {
    fetch(
      "http://api.alquran.cloud/edition?format=audio&type=versebyverse&language=ar"
    )
      .then(response => response.json())
      .then(parsedJSON => {
        const reciterList = parsedJSON.data.map(reciter => {
          return {
            value: reciter.identifier,
            label: reciter.name
          };
        });
        this.props.dispatch({
          type: "RECITERLIST",
          reciterList: reciterList
        });
        //console.log(parsedJSON.data);
      });
  }

  render() {
    return (
      <div className="row" style={this.styles}>
        <div className="col-md-3 p-2">
          <LeftPanel />
        </div>
        <div className="col-md-9 p-2">
          <RightPanel />
        </div>
      </div>
    );
  }
}

export default connect()(App);
