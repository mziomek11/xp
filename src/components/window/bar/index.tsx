import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import ExitAction from "../action/exit";
import FullscreenAction from "../action/fullscreen";
import MinimalizeAction from "../action/minimalize";
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

export const pixelsToLeave: number = 10;

export class Bar extends React.Component<Props, State> {
  readonly state: State = {
    barX: 0,
    barY: 0,
    minLeft: 0,
    maxLeft: 0,
    maxTop: 0
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    if ((ev.target as Element).classList.contains("window__action")) return;
    if (this.props.isFullScreened) return;

    const { lastWindowX, lastWindowY, windowWidth } = this.props;
    const { clientX, clientY } = ev;

    this.setState({
      barX: clientX - lastWindowX,
      barY: clientY - lastWindowY,
      minLeft: -windowWidth + pixelsToLeave,
      maxLeft: window.innerWidth - pixelsToLeave,
      maxTop: window.innerHeight - pixelsToLeave
    });

    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseUp = () => {
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseMove = (e: MouseEvent) => {
    const { max, min } = Math;
    const { barX, barY, minLeft, maxLeft, maxTop } = this.state;
    const left = min(max(e.clientX - barX, minLeft), maxLeft);
    const top = min(max(e.clientY - barY, 0), maxTop);

    this.props.moveWindow(left, top);
  };

  render() {
    return (
      <div
        className="window__bar"
        onMouseDown={this.handleMouseDown}
        data-test="bar"
      >
        <h4 className="window__title" data-test="title">
          {this.props.name}
        </h4>
        <div className="window__actions" data-test="actions">
          <MinimalizeAction id={this.props.id} data-test="action-minimalize" />
          <FullscreenAction id={this.props.id} data-test="action-fullscreen" />
          <ExitAction id={this.props.id} data-test="action-exit" />
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
): DispatchProps => {
  return {
    moveWindow: (x: number, y: number) => dispatch(moveWindow(id, x, y))
  };
};

export default withDoubleClick(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bar)
);
