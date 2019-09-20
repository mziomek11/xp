import React, { useState } from "react";

import DefaultOption from "../default/Option";
import { ArrowDirection } from "../default/Arrow";

type Props = {
  name: string;
  dropdown: React.ReactNode;
  arrowDirection?: ArrowDirection;
};

const Option: React.FC<Props> = ({
  name,
  dropdown,
  arrowDirection = "right"
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const handleMouseEnter = () => setShowDropDown(true);
  const handleMouseLeave = () => setShowDropDown(false);

  return (
    <DefaultOption
      name={name}
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
