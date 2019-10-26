import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import {
  fillRect,
  fillSpaceBetweenPoints,
  Vector
} from "../../../../../utils/paint";

import pencilIcon from "../../../../../assets/paint/pencil.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  lastPoint: Vector;
  isMouseButtonLeft: boolean;
};

export class Pencil extends Component<CtxProps, State> {
  readonly state: State = {
    lastPoint: { x: 0, y: 0 },
    isMouseButtonLeft: true
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseLeftDown = (canvasPos: Vector) => {
    this.setState({ isMouseButtonLeft: true });
    this.handleMouseDown(canvasPos);
  };

  handleMouseRightDown = (canvasPos: Vector) => {
    this.setState({ isMouseButtonLeft: false });
    this.handleMouseDown(canvasPos);
  };

  handleMouseDown = (canvasPos: Vector) => {
    const { setColor } = this.props.paint;

    setColor(this.state.isMouseButtonLeft);
    this.setState({ lastPoint: canvasPos });
    this.draw(canvasPos);
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { setColor } = this.props.paint;
    const { lastPoint, isMouseButtonLeft } = this.state;

    setColor(isMouseButtonLeft);
    fillSpaceBetweenPoints(lastPoint, canvasPos, this.draw);
    this.draw(canvasPos);
    this.setState({ lastPoint: canvasPos });
  };

  draw = (canvasPos: Vector) => {
    fillRect(canvasPos, 1, this.props.paint.canvasCtx!);
  };

  render() {
    return (
      <Tool
        icon={pencilIcon}
        toolType="pencil"
        onMouseLeftDown={this.handleMouseLeftDown}
        onMouseRightDown={this.handleMouseRightDown}
        onMouseMove={this.handleMouseMove}
        data-test="tool"
      />
    );
  }
}

export default withContext(Pencil, "paint");
