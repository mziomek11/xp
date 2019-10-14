import React from "react";

import Tool from "../Tool";
import pickIcon from "../../../../../assets/paint/pick.png";

const Pick = () => {
  return <Tool icon={pickIcon} toolType="pick" data-test="tool" />;
};

export default Pick;
