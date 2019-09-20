import React from "react";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName } from "../../../../utils";

import foldersIcon from "../../../../assets/folder/folders.png";

const Folders: React.FC<{ context: FilesystemContextType }> = ({ context }) => {
  const { setOptions, options } = context;
  const { showFolders } = options;

  const className = getClassName("filesystem__action", {
    activated: showFolders
  });

  const handleClick = () => setOptions({ showFolders: !showFolders });

  return (
    <div className="filesystem__actions">
      <div className={className} onClick={handleClick}>
        <img src={foldersIcon} alt="folders icon" />
        <span className="filesystem__action-text">Folders</span>
      </div>
    </div>
  );
};

export default withContext(Folders, "filesystem");
