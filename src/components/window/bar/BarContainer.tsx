import React, { MouseEvent } from "react";

import Bar from "./Bar";
import withContext from "../../../hoc/withContext";
import withDoubleClick from "../../../hoc/withDoubleClick";
import { toolbarConfig, windowConfig } from "../../../config";
import { Context } from "../Context";
import { getWindowPosition, getClassName } from "../../../utils";
import Vector from "../../../classes/Vector";

type DivMouseOrTouchEv =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;

type OwnProps = {
  window: Context;
};

type DoubleClickProps = {
  checkForDoubleClick: (onDouble: () => void) => void;
};

type Props = OwnProps & DoubleClickProps;

type State = {
  barX: number;
  barY: number;
  minLeft: number;
  maxLeft: number;
  maxTop: number;
};

export const initState: State = {
  barX: 0,
  barY: 0,
  minLeft: 0,
  maxLeft: 0,
  maxTop: 0
};

export class BarContainer extends React.Component<Props, State> {
  readonly state: State = initState;

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    window.addEventListener("touchend", this.removeListeners);
    window.addEventListener("touchmove", this.handleMouseMove);

    window.addEventListener("mouseup", this.removeListeners);
    window.addEventListener("mousemove", this.handleMouseMove);
  };

  removeListeners = () => {
    window.removeEventListener("touchend", this.removeListeners);
    window.removeEventListener("touchmove", this.handleMouseMove);

    window.removeEventListener("mouseup", this.removeListeners);
    window.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseDown = (e: DivMouseOrTouchEv) => {
    if (this.isAbleToMove(e)) {
      const newState: State = this.calculateNewState(e);
      this.setState(newState);
      this.addListeners();
    }
  };

  isAbleToMove = (e: DivMouseOrTouchEv) => {
    const actionClass: string = "window__action";
    const clickedOnAction: boolean = (e.target as Element).classList.contains(
      actionClass
    );

    return !clickedOnAction && !this.props.window.fullscreened;
  };

  calculateNewState = (e: DivMouseOrTouchEv): State => {
    const { left, top, width } = this.props.window;

    const windowPos: Vector = getWindowPosition(e);

    const barX: number = windowPos.x - left;
    const barY: number = windowPos.y - top;
    const minLeft: number = -width + windowConfig.PIXELS_TO_LEAVE;
    const maxLeft: number = window.innerWidth - windowConfig.PIXELS_TO_LEAVE;
    const maxTop: number =
      window.innerHeight - windowConfig.PIXELS_TO_LEAVE - toolbarConfig.HEIGHT;

    return { barX, barY, minLeft, maxLeft, maxTop };
  };

  handleMouseMove = (e: any) => {
    const newPosition = this.calculateNewPosition(e);

    this.props.window.setContext(newPosition);
  };

  calculateNewPosition = (
    e: MouseEvent | TouchEvent
  ): { left: number; top: number } => {
    const { barX, barY, minLeft, maxLeft, maxTop } = this.state;

    const windowPos: Vector = getWindowPosition(e);

    const left = Math.min(Math.max(windowPos.x - barX, minLeft), maxLeft);
    const top = Math.min(Math.max(windowPos.y - barY, 0), maxTop);

    return { left, top };
  };

  onDoubleClick = () => {
    const { fullscreened, setContext, hideFullscreen } = this.props.window;

    if (!hideFullscreen) {
      setContext({ fullscreened: !fullscreened });
    }
  };

  handleClick = () => {
    this.props.checkForDoubleClick(this.onDoubleClick);
  };

  getContainerClassName = () => {
    const { hideExit, hideFullscreen, hideMinimalize } = this.props.window;

    let actionCount = 3;
    if (hideExit) actionCount--;
    if (hideFullscreen) actionCount--;
    if (hideMinimalize) actionCount--;

    const baseClass = "window__bar";
    const modifiers = {
      "two-actions": actionCount === 2,
      "one-action": actionCount === 1
    };

    return getClassName(baseClass, modifiers);
  };

  render() {
    const {
      hideMinimalize,
      hideFullscreen,
      hideExit,
      hideIcon
    } = this.props.window;

    const containerClassName = this.getContainerClassName();
    return (
      <Bar
        containerClassName={containerClassName}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
        data-test="bar"
        showMinimalize={!hideMinimalize}
        showFullscreen={!hideFullscreen}
        showExit={!hideExit}
        showIcon={!hideIcon}
      />
    );
  }
}

export default withDoubleClick(withContext(BarContainer, "window"));
