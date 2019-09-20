import React from "react";

import Desktop from "../desktop/Desktop";
import Toolbar from "../toolbar/Toolbar";

const Screen: React.FC = () => {
  return (
    <div className="screen" data-test="screen">
      <Desktop data-test="desktop" />
      <Toolbar data-test="toolbar" />
    </div>
  );
};

export default Screen;
