import React from "react";

import Tool from "../Tool";
import anyShapeIcon from "../../../../../assets/paint/anyshape.png";

const AnySelect = () => {
  return <Tool icon={anyShapeIcon} toolType="anySelect" data-test="tool" />;
};

export default AnySelect;
