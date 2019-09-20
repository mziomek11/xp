import React, { useContext } from "react";

import FilesystemContext from "../../context/Context";

import {
  DropDown,
  OptionCheckBox,
  OptionWithDropDown
} from "../../../../dropdown/";

const ExplorerBar = () => {
  const { options, setOptions } = useContext(FilesystemContext);

  const onShowFoldersClick = () => {
    setOptions({ showFolders: !options.showFolders });
  };

  const dropdown = (
    <DropDown horPosition="right" vertPosition="top-aligned" withShortcuts>
      <OptionCheckBox
        isChecked={options.showFolders}
        onClick={onShowFoldersClick}
        name="Folders"
      />
    </DropDown>
  );
  return <OptionWithDropDown name="Explorer Bar" dropdown={dropdown} />;
};

export default ExplorerBar;
