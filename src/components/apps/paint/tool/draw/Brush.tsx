import React from "react";

import Tool from "../Tool";
import brushIcon from "../../../../../assets/paint/brush.png";

const Brush = () => {
  return <Tool icon={brushIcon} toolType="brush" data-test="tool" />;
};

export default Brush;
