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
  context: FilesystemContextType;
};

class View extends Component<Props, {}> {
  shouldComponentUpdate({ context }: Props) {
    const { display } = this.props.context.options;
    return display !== context.options.display;
  }
  handleDisplayClick = (option: string) => {
    this.props.context.setOptions({ display: option as any });
  };

  render() {
    const dropdown = (
      <DropDown>
        <OptionToolbars />
        <OptionExplorerBar />
        <Divider />
        <RadioGroup
          checkedValue={this.props.context.options.display}
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
