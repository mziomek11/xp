import React from "react";
import { getClassName } from "../../../../../utils";

type Props = {
  modifiers?: string[];
};

const Options: React.FC<Props> = ({ modifiers = [], children }) => {
  const baseClass = "paint__toolbar__options";
  const className = getClassName(baseClass, {}, modifiers);

  return (
    <div className={className} data-test="options">
      {children}
    </div>
  );
};

export default Options;
