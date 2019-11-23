import React, { Component } from "react";

import Menu from "../../../menu/Menu";
import MenuItem from "../../../menu/Item";
import { DropDown, Option } from "../../../dropdown";

class CalculatorMenu extends Component {
  render() {
    const dropdown = (
      <DropDown withShortcuts>
        <Option name="Copy" shortcut={["Crtl", "C"]} />
        <Option name="Paste" shortcut={["Ctrl", "V"]} />
      </DropDown>
    );

    return (
      <Menu data-test="menu">
        <MenuItem name="Edit" dropdown={dropdown} />
      </Menu>
    );
  }
}

export default CalculatorMenu;
