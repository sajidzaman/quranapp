import React, { Component } from "react";
//import Chapter from "./Chapter/Chapter";
import Surah from "./Surah/Surah";
import Verse from "./Verse/Verse";
import Reciter from "./Reciter/Reciter";
import TextEditions from "./Editions/Text/TextEditions";
import Translations from "./Editions/Translations/Translations";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./LeftPanel.css";
import Search from "./Search/Search";

class LeftPanel extends Component {
  render() {
    return (
      <div className="m-2 p-3 LeftPanel">
        <h3> Quran </h3>
        <Search />
        <TextEditions />

        <Tabs className="tabPanel">
          <TabList>
            <Tab> By Surah</Tab>
            {/* <Tab> By Chapter</Tab> */}
          </TabList>
          <TabPanel>
            <Surah />
            <Translations />
            <Verse />
          </TabPanel>
          {/* <TabPanel>
            <Chapter />
            <Verse />
          </TabPanel> */}
        </Tabs>
        <Reciter />
      </div>
    );
  }
}

export default LeftPanel;
