import React from "react";

import Tool from "../Tool";
import curveIcon from "../../../../../assets/paint/curve.png";

const Curve = () => {
  return <Tool icon={curveIcon} toolType="curve" data-test="tool" />;
};

export default Curve;
