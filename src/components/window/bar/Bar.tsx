import React from "react";

import Icon from "./Icon";
import Title from "./Title";
import MinimalizeAction from "../action/MinimalizeAction";
import FullscreenAction from "../action/FullscreenAction";
import ExitAction from "../action/ExitAction";

export type Props = {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
  showMinimalize: boolean;
  showFullscreen: boolean;
  showExit: boolean;
  showIcon: boolean;
};

export const Bar: React.FC<Props> = ({
  onMouseDown,
  onClick,
  showMinimalize,
  showFullscreen,
  showExit,
  showIcon
}) => {
  return (
    <div
      className="window__bar"
      onMouseDown={onMouseDown}
      data-test="bar"
      onClick={onClick}
    >
      <div className="window__bar__left">
        {showIcon && <Icon data-test="icon" />}
        <Title data-test="title" />
      </div>
      <div className="window__actions" data-test="actions">
        {showMinimalize && <MinimalizeAction data-test="action-minimalize" />}
        {showFullscreen && <FullscreenAction data-test="action-fullscreen" />}
        {showExit && <ExitAction data-test="action-exit" />}
      </div>
    </div>
  );
};

export default Bar;
