import React from "react";

import Bar from "./Bar";
import withContext from "../../../hoc/withContext";
import withDoubleClick from "../../../hoc/withDoubleClick";
import { toolbarConfig, windowConfig } from "../../../config";
import { Context } from "../Context";

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
    window.addEventListener("mouseup", this.removeListeners);
    window.addEventListener("mousemove", this.handleMouseMove);
  };

  removeListeners = () => {
    window.removeEventListener("mouseup", this.removeListeners);
    window.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.isAbleToMove(e)) {
      const newState: State = this.calculateNewState(e);
      this.setState(newState);
      this.addListeners();
    }
  };

  isAbleToMove = (e: any) => {
    const actionClass: string = "window__action";
    const clickedOnAction: boolean = e.target.classList.contains(actionClass);

    return !clickedOnAction && !this.props.window.fullscreened;
  };

  calculateNewState = (e: React.MouseEvent<HTMLDivElement>): State => {
    const { left, top, width } = this.props.window;

    const barX: number = e.clientX - left;
    const barY: number = e.clientY - top;
    const minLeft: number = -width + windowConfig.PIXELS_TO_LEAVE;
    const maxLeft: number = window.innerWidth - windowConfig.PIXELS_TO_LEAVE;
    const maxTop: number =
      window.innerHeight - windowConfig.PIXELS_TO_LEAVE - toolbarConfig.HEIGHT;

    return { barX, barY, minLeft, maxLeft, maxTop };
  };

  handleMouseMove = (e: MouseEvent) => {
    const newPosition = this.calculateNewPosition(e);

    this.props.window.setContext(newPosition);
  };

  calculateNewPosition = (e: MouseEvent): { left: number; top: number } => {
    const { barX, barY, minLeft, maxLeft, maxTop } = this.state;

    const left = Math.min(Math.max(e.clientX - barX, minLeft), maxLeft);
    const top = Math.min(Math.max(e.clientY - barY, 0), maxTop);

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

  render() {
    const {
      hideMinimalize,
      hideFullscreen,
      hideExit,
      hideIcon
    } = this.props.window;
    return (
      <Bar
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
