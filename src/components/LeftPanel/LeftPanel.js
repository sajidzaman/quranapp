import React, { Component } from "react";
import Chapter from "./Chapter/Chapter";
import Surah from "./Surah/Surah";
import Verse from "./Verse/Verse";
import Reciter from "./Reciter/Reciter";
import TextEditions from "./Editions/Text/TextEditions";
import Translations from "./Editions/Translations/Translations";

class LeftPanel extends Component {
  render() {
    return (
      <div className="m-2 p-3">
        <h3> Quran </h3>
        <TextEditions />
        <Surah />
        <Translations />
        <Verse />
        <Chapter />
        <Reciter />
      </div>
    );
  }
}

export default LeftPanel;
