import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import MenuItem from "../../../menu/Item";
import { DropDown, Option, Divider } from "../../../dropdown";
import { FilesystemContextType } from "ContextType";

type Props = {
  context: FilesystemContextType;
};

class Edit extends Component<Props, {}> {
  shouldComponentUpdate({ context }: Props) {
    const { cut, copy, paste } = this.props.context.shortcuts;

    if (cut.disabled !== context.shortcuts.cut.disabled) return true;
    if (copy.disabled !== context.shortcuts.copy.disabled) return true;
    if (paste.disabled !== context.shortcuts.paste.disabled) return true;

    return false;
  }

  invertSelection = () => {
    const { files, focused, setFocused } = this.props.context;

    const fileNames = Array.from(files, ({ name }) => name);
    setFocused(fileNames.filter(name => focused.indexOf(name) === -1));
  };

  render() {
    const { shortcuts } = this.props.context;
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
        <Option name="Invert Selection" onClick={this.invertSelection} />
      </DropDown>
    );
    return <MenuItem name="Edit" dropdown={dropdown} />;
  }
}

export default withContext(Edit, "filesystem");
