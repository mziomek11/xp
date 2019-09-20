import React from "react";

import ListItem from "../ListItem";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

import copyIcon from "../../../../../assets/folder/copy.png";
import deleteIcon from "../../../../../assets/folder/delete.png";

type Props = {
  context: FilesystemContextType;
};

export const ManyFocusedOptions: React.FC<Props> = ({ context }) => {
  const { shortcuts } = context;

  return (
    <ul className="filesystem__side-content-list" data-test="container">
      <ListItem icon={copyIcon} onClick={shortcuts.copy.emit}>
        Copy selected
      </ListItem>
      <ListItem icon={deleteIcon} onClick={shortcuts.delete.emit}>
        Delete selected
      </ListItem>
    </ul>
  );
};

export default withContext(ManyFocusedOptions, "filesystem");
