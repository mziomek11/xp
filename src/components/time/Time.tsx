import React from "react";
import { toolbarConfig } from "../../config";

const Time = () => {
  return (
    <div
      className="time"
      data-test="time"
      style={{ width: toolbarConfig.TIME_WIDTH }}
    >
      13:37
    </div>
  );
};

export default Time;
