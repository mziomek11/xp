import React, { useState } from "react";

import DefaultOption from "../default/Option";
import { ArrowDirection } from "../default/Arrow";

type Props = {
  name: string;
  dropdown: React.ReactNode;
  arrowDirection?: ArrowDirection;
  icon?: string;
};

const Option: React.FC<Props> = ({
  name,
  dropdown,
  icon,
  arrowDirection = "right"
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const handleMouseEnter = () => setShowDropDown(true);
  const handleMouseLeave = () => setShowDropDown(false);

  return (
    <DefaultOption
      name={name}
      icon={icon}
      additionalDropdown={dropdown}
      arrowDirection={arrowDirection}
      showDropDown={showDropDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-test="option"
    />
  );
};

export default Option;
