import React from "react";

import FileList from "./List";
import WindowList from "../window/List";
import { toolbarConfig } from "../../config";

export const Desktop = () => {
  const styles = {
    height: window.innerHeight - toolbarConfig.HEIGHT
  };

  return (
    <div className="desktop" data-test="desktop" style={styles}>
      <FileList data-test="file-list" />
      <WindowList data-test="window-list" />
    </div>
  );
};

export default Desktop;
