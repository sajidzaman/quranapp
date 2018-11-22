import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import Select from "react-select";
import "./Translations.css";

class Translations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onTranslationChangeHandler = event => {
    console.log("eventfor translationchange", event);
    this.props.dispatch({
      type: "TRANSLATION",
      translation: event.value === "0" ? null : event.value
    });
  };

  customStyles = {
    option: (provided, state) => {
      const rtlText =
        state.value.indexOf("ar.") !== -1 ||
        state.value.indexOf("ug.") !== -1 ||
        state.value.indexOf("ur.") !== -1 ||
        state.value.indexOf("fa.") !== -1;
      return {
        ...provided,
        borderBottom: "1px dotted pink",
        padding: 20,
        color: state.value,
        fontFamily: rtlText ? "Lateef" : "inherit",
        fontSize: rtlText ? 25 : "inherit",
        textAlign: rtlText ? "right" : "left"
      };
    },
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
    if (!this.props.translationList.translationList)
      return <ReactLoading color="green" type="spinningBubbles" />;

    if (this.props.translation.translation !== null) {
      var selectedTranslation = this.props.translationList.translationList.find(
        element =>
          element.options.find(
            translation =>
              translation.value === this.props.translation.translation
          )
      );
      selectedTranslation = selectedTranslation.options.filter(sub => {
        return sub.value === this.props.translation.translation;
      });
      //console.log("selected element", selectedTranslation);
    }

    return (
      <div className="Translations">
        <h5>Translations</h5>
        <Select
          classNamePrefix="optiontext"
          onChange={this.onTranslationChangeHandler}
          options={this.props.translationList.translationList}
          placeholder="select Translation"
          styles={this.customStyles}
          value={selectedTranslation}
        />
      </div>
    );
  }
}
const mapStatesToProps = state => {
  return {
    translationList: state.translationList,
    translation: state.translation
  };
};

export default connect(mapStatesToProps)(Translations);
