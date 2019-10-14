import React from "react";

import Tool from "../Tool";
import pencilIcon from "../../../../../assets/paint/pencil.png";

const Pencil = () => {
  return <Tool icon={pencilIcon} toolType="pencil" data-test="tool" />;
};

export default Pencil;
