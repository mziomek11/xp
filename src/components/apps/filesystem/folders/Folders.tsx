import React from "react";

import List from "./List";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

export const Folders: React.FC<{ filesystem: FilesystemContextType }> = ({
  filesystem
}) => {
  const handleCloseClick = () => filesystem.setOptions({ showFolders: false });

  return (
    <div className="filesystem__folders" data-test="container">
      <div className="filesystem__folders__header">
        <span>Folders</span>
        <div
          className="filesystem__folders__close"
          onClick={handleCloseClick}
          data-test="clickable"
        />
      </div>
      <List data-test="list" />
    </div>
  );
};

export default withContext(Folders, "filesystem");
