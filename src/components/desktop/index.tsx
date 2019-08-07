import React from "react";
import Files from "./files";
import Window from "../window";

const Desktop = () => {
  return (
    <div className="desktop">
      <Files />
      <Window name="Chrome">Siema</Window>
    </div>
  );
};

export default Desktop;
