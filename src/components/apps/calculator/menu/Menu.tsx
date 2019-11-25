import React, { PureComponent } from "react";

import Menu from "../../../menu/Menu";
import MenuItem from "../../../menu/Item";
import { DropDown, OptionCheckBox } from "../../../dropdown";

type Props = {
  groupingNumbers: boolean;
  onGroupingNumberClick: () => void;
};

class CalculatorMenu extends PureComponent<Props> {
  render() {
    const { groupingNumbers, onGroupingNumberClick } = this.props;
    const dropdown = (
      <DropDown>
        <OptionCheckBox
          name="Grouping numbers"
          onClick={onGroupingNumberClick}
          isChecked={groupingNumbers}
        />
      </DropDown>
    );

    return (
      <Menu data-test="menu">
        <MenuItem name="View" dropdown={dropdown} />
      </Menu>
    );
  }
}

export default CalculatorMenu;
