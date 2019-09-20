import React from "react";

import Arrow from "./Arrow";
import FolderUp from "./FolderUp";

const Navigation = () => {
  return (
    <div className="filesystem__actions" data-test="actions">
      <Arrow isLeft={true} data-test="arrow-left" />
      <Arrow isLeft={false} data-test="arrow-right" />
      <FolderUp data-test="folder-up" />
    </div>
  );
};

export default Navigation;
