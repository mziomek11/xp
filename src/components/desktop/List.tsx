import React from "react";

import Computer from "./file/Computer";
import Notepad from "./file/Notepad";
import Paint from "./file/Paint";
import Minesweeper from "./file/Minesweeper";

const FileList = () => {
  return (
    <div className="desktop__file__list" data-test="file-list">
      <Computer data-test="computer" />
      <Notepad data-test="notepad" />
      <Paint data-test="paint" />
      <Minesweeper data-test="minesweeper" />
    </div>
  );
};

export default FileList;
