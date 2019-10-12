import React, { createRef } from "react";
import { DirectionArrowProps } from "./Arrow";

import arrowLeftGrey from "../../../../../assets/folder/arrow-left-grey.png";
import arrowLeftColored from "../../../../../assets/folder/arrow-left-green.png";

const ArrowLeft: React.FC<DirectionArrowProps> = ({
  disabled,
  containerClass,
  arrowClass,
  onClick,
  historyArrow,
  onlyIcon
}) => {
  const container = createRef<HTMLDivElement>();
  const text = createRef<HTMLDivElement>();
  const arrow = createRef<HTMLImageElement>();
  const icon = disabled ? arrowLeftGrey : arrowLeftColored;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(e, container.current!, arrow.current!, text.current!);
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
        className={arrowClass}
        alt="navigation back arrow"
        ref={arrow}
        data-test="arrow"
      />
      {!onlyIcon && (
        <>
          <span
            className="filesystem__action__text"
            ref={text}
            data-test="text"
          >
            Back
          </span>
          {historyArrow}
        </>
      )}
    </div>
  );
};

export default ArrowLeft;
