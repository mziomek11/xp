import React from "react";

import withContext from "../../../../hoc/withContext";
import MenuItem from "../../../menu/Item";
import { DropDown, Option, Divider } from "../../../dropdown";
import { FilesystemContextType } from "ContextType";

type Props = {
  context: FilesystemContextType;
};

const Edit: React.FC<Props> = ({ context }) => {
  const { files, setFocused, focused, shortcuts } = context;

  const fileNames = Array.from(files, ({ name }) => name);
  const invertSelection = () => {
    setFocused(fileNames.filter(name => focused.indexOf(name) === -1));
  };

  const dropdown = (
    <DropDown withShortcuts>
      <Option
        name="Cut"
        disabled={shortcuts.cut.disabled}
        onClick={shortcuts.cut.emit}
        shortcut={["Crtl", "X"]}
      />
      <Option
        name="Copy"
        disabled={shortcuts.copy.disabled}
        onClick={shortcuts.copy.emit}
        shortcut={["Crtl", "C"]}
      />
      <Option
        name="Paste"
        disabled={shortcuts.paste.disabled}
        onClick={shortcuts.paste.emit}
        shortcut={["Crtl", "V"]}
      />
      <Divider />
      <Option
        name="Select All"
        shortcut={["Crtl", "A"]}
        onClick={shortcuts.selectAll.emit}
      />
      <Option name="Invert Selection" onClick={invertSelection} />
    </DropDown>
  );
  return <MenuItem name="Edit" dropdown={dropdown} />;
};

export default withContext(Edit, "filesystem");
