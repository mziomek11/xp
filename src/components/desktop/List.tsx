import React from "react";

import File from "./File";
import {
  notepadStartData,
  paintStartData,
  filesystemStartData,
  getBasicStartData
} from "../../fileStartData";

const FileList = () => {
  return (
    <div className="desktop__file__list" data-test="file-list">
      <File {...filesystemStartData} data-test="computer" />
      <File {...notepadStartData} data-test="notepad" />
      <File {...paintStartData} data-test="paint" />
      <File {...getBasicStartData("minesweeper")} data-test="minesweeper" />
      <File {...getBasicStartData("calculator")} data-test="calculator" />
    </div>
  );
};

export default FileList;
