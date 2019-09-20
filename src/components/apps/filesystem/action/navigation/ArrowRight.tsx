import React, { createRef } from "react";
import { DirectionArrowProps } from "./Arrow";

import arrowRightGrey from "../../../../../assets/folder/arrow-right-grey.png";
import arrowRightColored from "../../../../../assets/folder/arrow-right-green.png";

const ArrowRight: React.FC<DirectionArrowProps> = ({
  disabled,
  containerClass,
  onClick,
  historyArrow
}) => {
  const container = createRef<HTMLDivElement>();
  const arrow = createRef<HTMLImageElement>();
  const icon = disabled ? arrowRightGrey : arrowRightColored;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(e, container.current!, arrow.current!);
  };

  return (
    <div
      className={containerClass}
      onClick={handleClick}
      ref={container}
      data-test="container"
    >
      <img
        src={icon}
        className="filesystem__action-arrow"
        alt="navigation forward arrow"
        ref={arrow}
        data-test="arrow"
      />
      {historyArrow}
    </div>
  );
};

export default ArrowRight;
