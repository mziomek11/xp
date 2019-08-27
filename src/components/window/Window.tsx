import React from "react";

import BarContainer from "./bar/BarContainer";
import Resizers from "./resizer/List";

type Props = {
  className: string;
  inlineStyles: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

const Window: React.FC<Props> = ({
  className,
  inlineStyles,
  onMouseDown,
  children
}) => {
  return (
    <div
      className={className}
      style={inlineStyles}
      data-test="window"
      onMouseDown={onMouseDown}
    >
      <BarContainer data-test="bar" />
      <div className="window__content" data-test="content">
        {children}
      </div>
      <Resizers data-test="resizers" />
    </div>
  );
};

export default Window;
