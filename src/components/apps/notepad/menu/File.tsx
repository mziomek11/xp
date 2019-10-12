import React from "react";

import MenuItem from "../../../menu/Item";
import { DropDown, Option, Divider } from "../../../dropdown";

type Props = {
  onNewClick: VoidFunction;
  onOpenClick: VoidFunction;
  onSaveClick: VoidFunction;
  onSaveAsClick: VoidFunction;
  onCloseClick: VoidFunction;
};

const File: React.FC<Props> = ({
  onNewClick,
  onOpenClick,
  onSaveAsClick,
  onCloseClick,
  onSaveClick
}) => {
  const dropDown = (
    <DropDown withShortcuts>
      <Option name="New" shortcut={["Ctrl", "N"]} onClick={onNewClick} />
      <Option name="Open" shortcut={["Ctrl", "O"]} onClick={onOpenClick} />
      <Option name="Save" shortcut={["Ctrl", "S"]} onClick={onSaveClick} />
      <Option name="Save as..." onClick={onSaveAsClick} />
      <Divider />
      <Option name="Close" onClick={onCloseClick} />
    </DropDown>
  );

  return <MenuItem name="File" dropdown={dropDown} data-test="file" />;
};

export default File;
