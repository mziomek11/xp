import React from "react";

import withContext from "../../../../hoc/withContext";
import Tree from "../tree/Tree";
import { areArraysEqual } from "../../../../utils";
import { FilesystemContextType } from "ContextType";

const LocationList: React.FC<{ context: FilesystemContextType }> = ({
  context
}) => {
  const { path, setPath, historyPosition } = context;

  const handleClick = (newPath: string[]) => {
    if (!areArraysEqual(path, newPath)) setPath(newPath, historyPosition + 1);
  };

  return (
    <div className="filesystem__location-list">
      <Tree
        withToggler={false}
        selectedPath={path}
        onClick={handleClick}
        showOverflowX={false}
        classModifers={["location"]}
      />
    </div>
  );
};

export default withContext(LocationList, "filesystem");
