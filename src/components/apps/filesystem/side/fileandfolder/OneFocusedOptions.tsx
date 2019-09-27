import React from "react";

import ListItem from "../ListItem";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

import renameIcon from "../../../../../assets/folder/rename.png";
import copyIcon from "../../../../../assets/folder/copy.png";
import deleteIcon from "../../../../../assets/folder/delete.png";

type Props = {
  context: FilesystemContextType;
};

const OneFocusedOptions: React.FC<Props> = ({ context }) => {
  const { files, focused, setRenamedFile, shortcuts } = context;
  const { type } = files.filter(({ name }) => name === focused[0])[0];
  const typeText = type === "folder" ? "folder" : "file";

  const handleRenameClick = () => setRenamedFile(false);

  return (
    <ul className="filesystem__side__list">
      <ListItem icon={renameIcon} onClick={handleRenameClick}>
        Rename this {typeText}
      </ListItem>
      <ListItem icon={copyIcon} onClick={shortcuts.copy.emit}>
        Copy this {typeText}
      </ListItem>
      <ListItem icon={deleteIcon} onClick={shortcuts.delete.emit}>
        Delete this {typeText}
      </ListItem>
    </ul>
  );
};

export default withContext(OneFocusedOptions, "filesystem");
