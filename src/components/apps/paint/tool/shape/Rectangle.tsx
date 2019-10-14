import React from "react";

import Tool from "../Tool";
import rectIcon from "../../../../../assets/paint/rect.png";

const Rectangle = () => {
  return <Tool icon={rectIcon} toolType="rect" data-test="tool" />;
};

export default Rectangle;
