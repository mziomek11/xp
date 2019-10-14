import React from "react";

import Tool from "../Tool";
import zoomIcon from "../../../../../assets/paint/zoom.png";

const Zoom = () => {
  return <Tool icon={zoomIcon} toolType="zoom" data-test="tool" />;
};

export default Zoom;
