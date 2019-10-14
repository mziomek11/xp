import React from "react";

import Tool from "../Tool";
import rectShapeIcon from "../../../../../assets/paint/rectshape.png";

const RectSelect = () => {
  return <Tool icon={rectShapeIcon} toolType="rectSelect" data-test="tool" />;
};

export default RectSelect;
