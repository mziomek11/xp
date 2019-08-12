import React from "react";
import Files from "../file/list";
import OpenedWindows from "../window/list";

const Desktop = () => {
  return (
    <div className="desktop">
      <Files />
      <OpenedWindows />
    </div>
  );
};

export default Desktop;
