import React from "react";

import Menu from "../../../menu/Menu";
import File from "./File";
import Edit from "./Edit";
import View from "./View";
import Image from "./Image";

const PaintMenu = () => {
  return (
    <Menu>
      <File />
      <Edit />
      <View />
      <Image />
    </Menu>
  );
};

export default PaintMenu;
