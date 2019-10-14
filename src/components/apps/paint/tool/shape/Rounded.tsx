import React from "react";

import Tool from "../Tool";
import roundedIcon from "../../../../../assets/paint/rounded.png";

const Rounded = () => {
  return <Tool icon={roundedIcon} toolType="rounded" data-test="tool" />;
};

export default Rounded;
