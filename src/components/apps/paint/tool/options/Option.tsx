import React from "react";

import { getClassName } from "../../../../../utils";

export type Props = {
  onClick: VoidFunction;
  focused: boolean;
  modifiers?: string[];
};

const Option: React.FC<Props> = ({
  children,
  onClick,
  focused,
  modifiers = []
}) => {
  const defaultClassName: string = "paint__toolbar__options__option";
  const className = getClassName(defaultClassName, { focused }, modifiers);

  return (
    <div className={className} onClick={onClick} data-test="option">
      {children}
    </div>
  );
};

export default Option;
