import React from "react";
import { getClassName } from "../../../../../utils";

type Props = {
  style?: React.CSSProperties;
  modifiers?: string[];
};

const Options: React.FC<Props> = ({ modifiers = [], style = {}, children }) => {
  const baseClass = "paint__toolbar__options";
  const className = getClassName(baseClass, {}, modifiers);

  return (
    <div className={className} style={style} data-test="options">
      {children}
    </div>
  );
};

export default Options;
