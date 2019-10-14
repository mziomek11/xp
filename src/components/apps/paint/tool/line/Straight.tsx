import React from "react";

import Tool from "../Tool";
import straightIcon from "../../../../../assets/paint/straight.png";

const Straight = () => {
  return <Tool icon={straightIcon} toolType="line" data-test="tool" />;
};

export default Straight;
