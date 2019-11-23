import React from "react";

import Basic from "./file/Basic";
import Computer from "./file/Computer";
import Notepad from "./file/Notepad";
import Paint from "./file/Paint";

const FileList = () => {
  return (
    <div className="desktop__file__list" data-test="file-list">
      <Computer data-test="computer" />
      <Notepad data-test="notepad" />
      <Paint data-test="paint" />
      <Basic app="minesweeper" data-test="minesweeper" />
      <Basic app="calculator" data-test="calculator" />
    </div>
  );
};

export default FileList;
