import React from "react";
import FileList from "../file/List";
import WindowList from "../window/List";

const Desktop = () => {
  return (
    <div className="desktop" data-test="desktop">
      <FileList data-test="file-list" />
      <WindowList data-test="window-list" />
    </div>
  );
};

export default Desktop;
