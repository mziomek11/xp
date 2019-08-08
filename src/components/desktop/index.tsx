import React from "react";
import Files from "./files";
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
