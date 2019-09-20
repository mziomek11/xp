import React, { useContext } from "react";

import FilesystemContext from "../../context/Context";
import {
  DropDown,
  Divider,
  Option,
  OptionWithDropDown,
  OptionCheckBox
} from "../../../../dropdown/";

const GoTo = () => {
  const {
    getLocationOptions,
    history,
    historyPosition,
    shortcuts
  } = useContext(FilesystemContext);

  const locationOptions = getLocationOptions(0, history.length, true);
  const dropdown = (
    <DropDown horPosition="right" vertPosition="top-aligned" withShortcuts>
      <Option
        name="Back"
        disabled={shortcuts.back.disabled}
        onClick={shortcuts.back.emit}
        shortcut={["Alt", "Left Arrow"]}
      />
      <Option
        name="Forward"
        disabled={shortcuts.forward.disabled}
        onClick={shortcuts.forward.emit}
        shortcut={["Alt", "Right Arrow"]}
      />
      <Option
        name="Up One Level"
        disabled={shortcuts.goUp.disabled}
        onClick={shortcuts.goUp.emit}
      />
      <Divider />
      {locationOptions.map(({ name, onClick }, i) => (
        <OptionCheckBox
          isChecked={i === historyPosition}
          key={i}
          name={name}
          onClick={onClick}
        />
      ))}
    </DropDown>
  );
  return <OptionWithDropDown name="Go To" dropdown={dropdown} />;
};

export default GoTo;
