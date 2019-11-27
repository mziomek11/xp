import React from "react";

import { getClassName } from "../../utils";

type Props = {
  withShortcuts?: boolean;
  vertPosition?: "top" | "bottom" | "top-aligned" | "bottom-aligned";
  horPosition?: "left" | "right" | "left-aligned" | "right-aligned";
  classModifiers?: string[];
};

const Options: React.FC<Props> = ({
  children,
  vertPosition = "bottom",
  horPosition = "left-aligned",
  withShortcuts = false,
  classModifiers = []
}) => {
  const baseClass = "dropdown";
  const defaultModifiers = [vertPosition, horPosition, ...classModifiers];
  const className = getClassName(
    baseClass,
    { shortcut: withShortcuts },
    defaultModifiers
  );

  return (
    <div className={className} data-test="dropdown">
      {children}
    </div>
  );
};

export default Options;
