import React from "react";

import Menu from "./menu/Menu";
import ToolBar from "./tool/Bar";
import Canvas from "./canvas/Canvas";
import ColorBar from "./color/Bar";

const Paint = () => {
  return (
    <div className="paint" data-test="paint">
      <Menu data-test="menu" />
      <div className="paint__middle">
        <ToolBar data-test="toolbar" />
        <Canvas data-test="canvas" />
      </div>
      <ColorBar data-test="colorbar" />
    </div>
  );
};

export default Paint;
