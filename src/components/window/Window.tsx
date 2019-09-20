import React from "react";

import Content from "./Content";
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
      <Content children={children} data-test="content" />
      <Resizers data-test="resizers" />
    </div>
  );
};

export default Window;
