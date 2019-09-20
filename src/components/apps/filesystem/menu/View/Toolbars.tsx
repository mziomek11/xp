import React, { useContext } from "react";

import FilesystemContext from "../../context/Context";

import {
  DropDown,
  OptionWithDropDown,
  OptionCheckBox
} from "../../../../dropdown/";

const Toolbars = () => {
  const { options, setOptions } = useContext(FilesystemContext);
  const { showActionBar, showAdressBar } = options;

  const onShowStandardButtonsClick = () => {
    setOptions({ showActionBar: !showActionBar });
  };

  const onShowAdressBarClick = () => {
    setOptions({ showAdressBar: !showAdressBar });
  };

  const dropdown = (
    <DropDown horPosition="right" vertPosition="top-aligned">
      <OptionCheckBox
        isChecked={showActionBar}
        onClick={onShowStandardButtonsClick}
        name="Standard Buttons"
      />
      <OptionCheckBox
        isChecked={showAdressBar}
        onClick={onShowAdressBarClick}
        name="Adress Bar"
      />
    </DropDown>
  );
  return <OptionWithDropDown name="Toolbars" dropdown={dropdown} />;
};

export default Toolbars;
