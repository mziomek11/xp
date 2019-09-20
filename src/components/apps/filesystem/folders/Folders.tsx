import React from "react";

import List from "./List";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

export const Folders: React.FC<{ context: FilesystemContextType }> = ({
  context
}) => {
  const handleCloseClick = () => context.setOptions({ showFolders: false });

  return (
    <div className="filesystem__folders" data-test="container">
      <div className="filesystem__folders-header">
        <span>Folders</span>
        <div
          className="filesystem__folders-close"
          onClick={handleCloseClick}
          data-test="clickable"
        />
      </div>
      <List data-test="list" />
    </div>
  );
};

export default withContext(Folders, "filesystem");
