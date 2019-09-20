import React from "react";

import Shortcut from "./Shortcut";
import Arrow, { ArrowDirection } from "./Arrow";
import Icon from "./Icon";
import Check, { CheckOptions } from "./Check";
import { getClassName } from "../../../../utils";

export type Props = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showDropDown?: boolean;
  name: string;
  disabled?: boolean;
  additionalDropdown?: React.ReactNode;
  shortcut?: string[];
  isChecked?: boolean;
  checkType?: CheckOptions;
  icon?: string;
  arrowDirection?: ArrowDirection;
};

const Option: React.FC<Props> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  shortcut,
  checkType,
  icon,
  arrowDirection,
  disabled = false,
  isChecked = false,
  additionalDropdown,
  showDropDown,
  name
}) => {
  const baseClass = "dropdown__option";
  const className = getClassName(baseClass, { disabled });

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  const handleMouseEnter = () => {
    if (!disabled && onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    if (!disabled && onMouseLeave) onMouseLeave();
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-test="container"
    >
      {icon ? (
        <Icon icon={icon} data-test="icon" />
      ) : (
        <Check renderCheck={isChecked} type={checkType} data-test="check" />
      )}

      <span className="dropdown__text" data-test="name">
        {name}
      </span>

      <Shortcut shortcut={shortcut} data-test="shortcut" />
      <Arrow direction={arrowDirection} data-test="arrow" />
      <div
        className="dropdown__additional-dropdown"
        data-test="dropdown-container"
      >
        {showDropDown && additionalDropdown}
      </div>
    </div>
  );
};

export default Option;
