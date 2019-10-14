import React from "react";

import CurrentColors from "./Current";
import ColorList from "./List";

const Bar = () => {
  return (
    <div className="paint__color__bar" data-test="bar">
      <CurrentColors data-test="curr" />
      <ColorList data-test="list" />
    </div>
  );
};

export default Bar;
