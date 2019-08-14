import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import ExitAction from "../action/ExitAction";
import FullscreenAction from "../action/FulscreenAction";
import MinimalizeAction from "../action/MinimalizeAction";
import { RootState } from "MyTypes";
import { move as moveWindow } from "../../../store/window/actions";
import { withDoubleClick } from "../../../hoc";

type OwnProps = {
  id: string;
};

type StateProps = {
  name: string;
  lastWindowX: number;
  lastWindowY: number;
  windowWidth: number;
  isFullScreened: boolean;
};

type DispatchProps = {
  moveWindow: (x: number, y: number) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

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

export const pixelsToLeave: number = 10;

export class Bar extends React.Component<Props, State> {
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

    return !clickedOnAction && !this.props.isFullScreened;
  };

  calculateNewState = (e: React.MouseEvent<HTMLDivElement>): State => {
    const { lastWindowX, lastWindowY, windowWidth } = this.props;

    const barX: number = e.clientX - lastWindowX;
    const barY: number = e.clientY - lastWindowY;
    const minLeft: number = -windowWidth + pixelsToLeave;
    const maxLeft: number = window.innerWidth - pixelsToLeave;
    const maxTop: number = window.innerHeight - pixelsToLeave;

    return { barX, barY, minLeft, maxLeft, maxTop };
  };

  handleMouseMove = (e: MouseEvent) => {
    const { left, top } = this.calculateNewPosition(e);

    this.props.moveWindow(left, top);
  };

  calculateNewPosition = (e: MouseEvent): { left: number; top: number } => {
    const { barX, barY, minLeft, maxLeft, maxTop } = this.state;

    const left = Math.min(Math.max(e.clientX - barX, minLeft), maxLeft);
    const top = Math.min(Math.max(e.clientY - barY, 0), maxTop);

    return { left, top };
  };

  render() {
    const { name, id } = this.props;
    return (
      <div
        className="window__bar"
        onMouseDown={this.handleMouseDown}
        data-test="bar"
      >
        <h4 className="window__title" data-test="title">
          {name}
        </h4>
        <div className="window__actions" data-test="actions">
          <MinimalizeAction id={id} data-test="action-minimalize" />
          <FullscreenAction id={id} data-test="action-fullscreen" />
          <ExitAction id={id} data-test="action-exit" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => {
  const window = state.window.byId[id];
  return {
    name: window.name,
    lastWindowX: window.left,
    lastWindowY: window.top,
    isFullScreened: window.fullscreened,
    windowWidth: window.width
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  moveWindow: (x: number, y: number) => dispatch(moveWindow(id, x, y))
});

export default withDoubleClick(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bar)
);
