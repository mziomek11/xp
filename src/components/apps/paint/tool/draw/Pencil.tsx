import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { drawLine, fillCircle } from "../../../../../utils/paint";

import pencilIcon from "../../../../../assets/paint/pencil.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  lastX: number;
  lastY: number;
};

export const pencilSize: number = 1;

export class Pencil extends Component<CtxProps, State> {
  readonly state: State = {
    lastX: 0,
    lastY: 0
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (x: number, y: number) => {
    const { canvasCtx } = this.props.paint;

    this.setColor();
    this.setState({ lastX: x, lastY: y });
    fillCircle(x, y, pencilSize, canvasCtx!);
  };

  handleMouseMove = (x: number, y: number) => {
    const { canvasCtx } = this.props.paint;
    const { lastX, lastY } = this.state;

    this.setColor();
    drawLine(lastX, lastY, x, y, pencilSize, canvasCtx!);
    fillCircle(x, y, pencilSize, canvasCtx!);
    this.setState({ lastX: x, lastY: y });
  };

  setColor = () => {
    const { primaryColor, canvasCtx } = this.props.paint;

    canvasCtx!.strokeStyle = primaryColor;
    canvasCtx!.fillStyle = primaryColor;
  };

  render() {
    return (
      <Tool
        icon={pencilIcon}
        toolType="pencil"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        data-test="tool"
      />
    );
  }
}

export default withContext(Pencil, "paint");
