import React from "react";

import Location from "./Location";
import Arrow from "../../../../apps/filesystem/action/navigation/Arrow";
import FolderUp from "../../../../apps/filesystem/action/navigation/FolderUp";

const Navigation = () => {
  return (
    <div className="picker__navigation" data-test="navigation">
      <Location data-test="location" />
      <div className="picker__actions">
        <Arrow isLeft onlyIcon small data-test="arrow" />
        <FolderUp small data-test="folder-up" />
      </div>
    </div>
  );
};

export default Navigation;
