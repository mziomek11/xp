import React from "react";
import Start from "../start";
import Applications from "./applications";
import Time from "../time";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__left-side">
        <Start />
        <Applications />
      </div>
      <Time />
    </div>
  );
};

export default Toolbar;
