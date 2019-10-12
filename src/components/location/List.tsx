import React from "react";

import Tree from "../apps/filesystem/tree/Tree";
import { LocationProps } from "./Location";
import { areArraysEqual } from "../../utils";

const LocationList: React.FC<LocationProps> = ({
  historyPosition,
  path,
  setPath
}) => {
  const handleClick = (newPath: string[]) => {
    if (!areArraysEqual(path, newPath)) setPath(newPath, historyPosition! + 1);
  };

  return (
    <div className="location__list" data-test="list">
      <Tree
        withToggler={false}
        selectedPath={path}
        onClick={handleClick}
        showOverflowX={false}
        classModifers={["location"]}
        data-test="tree"
      />
    </div>
  );
};

export default LocationList;
