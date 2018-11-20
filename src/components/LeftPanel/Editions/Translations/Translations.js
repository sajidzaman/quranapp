import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import groupBy from "lodash/groupBy";
//import uniqBy from "lodash/uniqBy";
import toArray from "lodash/toArray";
import ISO6391 from "iso-639-1";
import Select from "react-select";
import "./Translations.css";

class Translations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchTranslations();
  }

  onTranslationChangeHandler = event => {
    console.log(event.value);
    this.props.dispatch({
      type: "TRANSLATION",
      translation: event.value === "0" ? null : event.value
    });
  };

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

        console.log("translations", toArray(translations));
        this.setState({
          translations: translationOptions
        });
      });
  }

  customStyles = {
    option: (provided, state) => {
      const rtlText = (state.value.indexOf("ar.") !== -1 || state.value.indexOf("ug.") !== -1 || state.value.indexOf("ur.") !== -1 || state.value.indexOf("fa.") !== -1);
      return {
      ...provided,
      borderBottom: "1px dotted pink",      
      padding: 20,
      color: state.value,
      fontFamily: rtlText ? "Lateef" : "inherit" ,
      fontSize: rtlText ? 25 : "inherit" ,
      textAlign: rtlText ? "right" : "left"
    }},
    control: provided => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      fontSize: 25
    }),
    groupHeading: provided => ({
      ...provided,
      fontSize: 20,      
      color: "green"
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "green";
      return { ...provided, opacity, transition, color };
    }
  };

  render() {
    if (!this.state.translations)
      return <ReactLoading color="green" type="spinningBubbles" />;
    console.log("groupby language", this.state.languages);
    return (
      <div className="Translations">
        <h5>Translations</h5>
        <Select
        classNamePrefix="optiontext"
          onChange={this.onTranslationChangeHandler}
          options={this.state.translations}
          placeholder="select Translation"
          styles={this.customStyles}          
        />
      </div>
    );
  }
}

export default connect()(Translations);
