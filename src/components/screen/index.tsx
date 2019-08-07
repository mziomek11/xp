import React from "react";
import Desktop from "../desktop";
import Toolbar from "../toolbar";

const Screen: React.FC = () => {
  return (
    <div className="screen">
      <Desktop />
      <Toolbar />
    </div>
  );
};

export default Screen;
