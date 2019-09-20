import React from "react";

import Menu from "../../../menu/Menu";
import File from "./File";
import Edit from "./Edit";
import View from "./View/View";

const FileSystemMenu = () => {
  return (
    <Menu>
      <File />
      <Edit />
      <View />
    </Menu>
  );
};

export default FileSystemMenu;
