import React from "react";

import Application from "./application/Application";
import AllPrograms from "./allprograms/AllPrograms";
import Divider from "./Divider";

import {
  paintStartData,
  notepadStartData,
  getBasicStartData
} from "../../../../fileStartData";

const Left = () => {
  return (
    <div className="start__left" data-test="left">
      <Application {...paintStartData} isBold />
      <Application {...notepadStartData} isBold />
      <Application {...getBasicStartData("minesweeper")} isBold />
      <Divider />
      <Application {...getBasicStartData("calculator")} />
      <Divider />
      <AllPrograms />
    </div>
  );
};

export default Left;
