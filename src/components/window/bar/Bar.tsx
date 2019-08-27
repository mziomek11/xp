import React from "react";

import MinimalizeAction from "../action/MinimalizeAction";
import FullscreenAction from "../action/FullscreenAction";
import ExitAction from "../action/ExitAction";
import { withDoubleClick } from "../../../hoc";

type Props = {
  name: string;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Bar: React.FC<Props> = ({ name, onMouseDown }) => {
  return (
    <div className="window__bar" onMouseDown={onMouseDown} data-test="bar">
      <h4 className="window__title" data-test="title">
        {name}
      </h4>
      <div className="window__actions" data-test="actions">
        <MinimalizeAction data-test="action-minimalize" />
        <FullscreenAction data-test="action-fullscreen" />
        <ExitAction data-test="action-exit" />
      </div>
    </div>
  );
};

export default withDoubleClick(Bar);
