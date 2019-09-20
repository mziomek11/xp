import React from "react";

import DefaultOption from "../default/Option";

export type Props = {
  name: string;
  isChecked: boolean;
  onClick: () => void;
  shortcut?: string[];
  disabled?: boolean;
};

const Option: React.FC<Props> = ({
  name,
  isChecked,
  onClick,
  shortcut,
  disabled
}) => {
  return (
    <DefaultOption
      name={name}
      isChecked={isChecked}
      onClick={onClick}
      checkType="check"
      shortcut={shortcut}
      disabled={disabled}
      data-test="option"
    />
  );
};

export default Option;
