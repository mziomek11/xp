import React from "react";

import { DropDown, Option } from "../../../../dropdown";
import { OptionData } from "../../context/models";

type Props = {
  options: OptionData[];
};

const HistoryArrowDropdown: React.FC<Props> = ({ options }) => {
  return (
    <DropDown withShortcuts data-test="dropdown">
      {options.map(({ name, onClick }, i) => (
        <Option name={name} onClick={onClick} key={i} data-test="option" />
      ))}
    </DropDown>
  );
};

export default HistoryArrowDropdown;
