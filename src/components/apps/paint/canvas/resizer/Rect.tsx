import React from "react";

type Props = {
  width: number;
  height: number;
};

const ResizerRect: React.FC<Props> = ({ width, height }) => {
  return (
    <div
      className="paint__canvas__resizer__rect"
      style={{ width, height }}
      data-test="rect"
    />
  );
};

export default ResizerRect;
