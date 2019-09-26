import React from "react";

import Icon from "./Icon";
import Title from "./Title";
import MinimalizeAction from "../action/MinimalizeAction";
import FullscreenAction from "../action/FullscreenAction";
import ExitAction from "../action/ExitAction";

type Props = {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
};

export const Bar: React.FC<Props> = ({ onMouseDown, onClick }) => {
  return (
    <div
      className="window__bar"
      onMouseDown={onMouseDown}
      data-test="bar"
      onClick={onClick}
    >
      <div className="window__bar-left">
        <Icon data-test="icon" />
        <Title data-test="title" />
      </div>
      <div className="window__actions" data-test="actions">
        <MinimalizeAction data-test="action-minimalize" />
        <FullscreenAction data-test="action-fullscreen" />
        <ExitAction data-test="action-exit" />
      </div>
    </div>
  );
};

export default Bar;
