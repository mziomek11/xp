import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import ExitAction from "../action/exit";
import FullscreenAction from "../action/fullscreen";
import MinimalizeAction from "../action/minimalize";
import { RootState } from "MyTypes";
import { move as moveWindow } from "../../../store/window/actions";

type OwnProps = {
  id: string;
};

type StateProps = {
  name: string;
  lastWindowX: number;
  lastWindowY: number;
  windowWidth: number;
  windowHeight: number;
};

type DispatchProps = {
  moveWindow: (x: number, y: number) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  barX: number;
  barY: number;
  maxBarX: number;
  maxBarY: number;
};

export class Bar extends React.Component<Props, State> {
  readonly state: State = {
    barX: 0,
    barY: 0,
    maxBarX: 0,
    maxBarY: 0
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    const { lastWindowX, lastWindowY, windowWidth, windowHeight } = this.props;
    const { clientX, clientY } = ev;
    const { innerWidth, innerHeight } = window;
    this.setState({
      barX: clientX - lastWindowX,
      barY: clientY - lastWindowY,
      maxBarX: innerWidth - windowWidth,
      maxBarY: innerHeight - windowHeight
    });

    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseUp = () => {
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseMove = (e: MouseEvent) => {
    const { barX, barY, maxBarX, maxBarY } = this.state;
    let left: number = Math.max(e.clientX - barX, 0);
    let top: number = Math.max(e.clientY - barY, 0);
    left = Math.min(left, maxBarX);
    top = Math.min(top, maxBarY);

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
    windowWidth: window.width,
    windowHeight: window.height
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bar);
