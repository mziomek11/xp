import React from "react";
import { toolbarConfig } from "../../../config";

const Start = () => {
  return (
    <div
      className="start"
      data-test="start"
      style={{ width: toolbarConfig.START_WIDTH }}
    />
  );
};

export default Start;
