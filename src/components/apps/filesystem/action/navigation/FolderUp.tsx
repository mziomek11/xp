import React from "react";

import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName } from "../../../../../utils";

import folderUpGrey from "../../../../../assets/folder/folder-up-grey.png";
import folderUpColored from "../../../../../assets/folder/folder-up-colored.png";

type Props = { context: FilesystemContextType };

export const FolderUp: React.FC<Props> = ({ context }) => {
  const { disabled, emit } = context.shortcuts.goUp;
  const className = getClassName("filesystem__action", { disabled });
  const icon = disabled ? folderUpGrey : folderUpColored;

  const handleClick = () => {
    if (!disabled) emit();
  };

  return (
    <div className={className} onClick={handleClick} data-test="container">
      <img src={icon} alt="folder with arrow up" data-test="image" />
    </div>
  );
};

export default withContext(FolderUp, "filesystem");
