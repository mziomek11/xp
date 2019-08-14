import React from "react";
import Start from "../start/Start";
import Applications from "./application/List";
import Time from "../time/Time";

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
