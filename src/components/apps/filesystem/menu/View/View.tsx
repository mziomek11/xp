import React, { Component } from "react";

import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

import MenuItem from "../../../../menu/Item";
import OptionArrangeIconsBy from "./ArrangeIconsBy";
import OptionExplorerBar from "./ExplorerBar";
import OptionGoTo from "./GoTo";
import OptionToolbars from "./Toolbars";
import { DropDown, Divider, Option, RadioGroup } from "../../../../dropdown/";

type Props = {
  filesystem: FilesystemContextType;
};

class View extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const { display } = this.props.filesystem.options;
    return display !== filesystem.options.display;
  }
  handleDisplayClick = (option: string) => {
    this.props.filesystem.setOptions({ display: option as any });
  };

  render() {
    const dropdown = (
      <DropDown>
        <OptionToolbars />
        <OptionExplorerBar />
        <Divider />
        <RadioGroup
          checkedValue={this.props.filesystem.options.display}
          onClick={this.handleDisplayClick}
          options={[
            { name: "Thumbnails", value: "thumbnails" },
            { name: "Tiles", value: "tiles" },
            { name: "Icons", value: "icons" },
            { name: "List", value: "list" }
          ]}
        />
        <Divider />
        <OptionArrangeIconsBy />
        <Divider />
        <OptionGoTo />
        <Option name="Refresh" />
      </DropDown>
    );

    return <MenuItem name="View" dropdown={dropdown} />;
  }
}

export default withContext(View, "filesystem");
