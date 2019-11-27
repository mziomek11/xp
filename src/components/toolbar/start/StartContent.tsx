import React from "react";

import Top from "./top/Top";
import Left from "./center/Left";
import OrangeDivider from "./center/OrangeDivider";
import Right from "./center/Right";
import Bottom from "./bottom/Bottom";

const StartContent = () => {
  return (
    <div className="start__content" data-test="content">
      <Top />
      <div className="start__center">
        <OrangeDivider />
        <div className="start__grid">
          <Left />
          <Right />
        </div>
      </div>
      <Bottom />
    </div>
  );
};

export default StartContent;
