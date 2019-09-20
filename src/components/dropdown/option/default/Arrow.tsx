import React from "react";

export type ArrowDirection = "right" | "left" | "top" | "bottom" | "none";

type Props = {
  direction?: ArrowDirection;
};

const Arrow: React.FC<Props> = ({ direction = "none" }) => {
  return (
    <div className="dropdown__arrow-container" data-test="container">
      <div
        className={`dropdown__arrow dropdown__arrow--${direction}`}
        data-test="arrow"
      />
    </div>
  );
};

export default Arrow;
