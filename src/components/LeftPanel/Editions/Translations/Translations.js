import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import groupBy from "lodash/groupBy";
import uniqBy from "lodash/uniqBy";
import toArray from "lodash/toArray";
import ISO6391 from "iso-639-1";

class Translations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchTranslations();
  }

  onTranslationChangeHandler = event => {
    console.log(event.target.value);
    this.props.dispatch({
      type: "TRANSLATION",
      translation: event.target.value === "0" ? null : event.target.value
    });
  };

  fetchTranslations() {
    fetch("http://api.alquran.cloud/edition?format=text&type=translation")
      .then(response => response.json())
      .then(parsedJSON => {
        const translations = groupBy(parsedJSON.data, translation => {
          return translation.language;
        });
        const languages = uniqBy(parsedJSON.data, translation => {
          return translation.language;
        });
        console.log("translations", toArray(translations));
        this.setState({
          translationKeys: Object.keys(translations),
          translations: translations,
          languages: languages
        });
      });
  }

  render() {
    if (!this.state.translations)
      return <ReactLoading color="green" type="spinningBubbles" />;
    console.log("groupby language", this.state.languages);
    return (
      <div>
        <h5>Translations</h5>
        <select
          className="custom-select"
          onChange={this.onTranslationChangeHandler}
        >
          <option value="0" key="null">
            No Translation
          </option>
          {this.state.translationKeys.map(language => {
            let translations = this.state.translations[language];
            console.log(translations);
            return (
              <optgroup label={ISO6391.getNativeName(language)} key={language}>
                {translations.map(function(translation) {
                  return (
                    <option
                      value={translation.identifier}
                      key={translation.identifier}
                    >
                      {translation.name}
                    </option>
                  );
                })}
              </optgroup>
            );
          })}
        </select>
      </div>
    );
  }
}

export default connect()(Translations);
