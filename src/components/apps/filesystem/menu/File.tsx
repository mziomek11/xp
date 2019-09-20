import React, { useContext } from "react";

import WindowContext from "../../../window/Context";
import FilesystemContet from "../context/Context";
import MenuItem from "../../../menu/Item";
import { DropDown, Option, Divider } from "../../../dropdown";

const File = () => {
  const { close } = useContext(WindowContext);
  const { path, focused, setRenamedFile, shortcuts } = useContext(
    FilesystemContet
  );

  const isRenameDisabled = path.length === 0 || focused.length !== 1;
  const handleRenameClick = () => setRenamedFile(false);

  const dropdown = (
    <DropDown>
      <Option
        name="Delete"
        disabled={shortcuts.delete.disabled}
        onClick={shortcuts.delete.emit}
      />
      <Option
        name="Rename"
        disabled={isRenameDisabled}
        onClick={handleRenameClick}
      />
      <Divider />
      <Option name="Close" onClick={close} />
    </DropDown>
  );

  return <MenuItem name="File" dropdown={dropdown} />;
};

export default File;
