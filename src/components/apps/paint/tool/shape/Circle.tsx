import React from "react";

import Tool from "../Tool";
import circleIcon from "../../../../../assets/paint/circle.png";

const Circle = () => {
  return <Tool icon={circleIcon} toolType="circle" data-test="tool" />;
};

export default Circle;
