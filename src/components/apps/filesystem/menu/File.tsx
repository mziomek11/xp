import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import MenuItem from "../../../menu/Item";
import { DropDown, Option, Divider } from "../../../dropdown";
import { WindowContextType, FilesystemContextType } from "ContextType";
import { areArraysEqual } from "../../../../utils";

type Props = {
  window: WindowContextType;
  filesystem: FilesystemContextType;
};

class File extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const { shortcuts, path, focused } = this.props.filesystem;

    if (!areArraysEqual(path, filesystem.path)) return true;
    if (!areArraysEqual(focused, filesystem.focused)) return true;
    if (shortcuts.delete.disabled !== filesystem.shortcuts.delete.disabled) {
      return true;
    }

    return false;
  }

  handleRenameClick = () => this.props.filesystem.setRenamedFile(false);

  render() {
    const { shortcuts, path, focused } = this.props.filesystem;
    const { close } = this.props.window;
    const isRenameDisabled = path.length === 0 || focused.length !== 1;

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
          onClick={this.handleRenameClick}
        />
        <Divider />
        <Option name="Close" onClick={close} />
      </DropDown>
    );

    return <MenuItem name="File" dropdown={dropdown} />;
  }
}

export default withContext(withContext(File, "window"), "filesystem");
