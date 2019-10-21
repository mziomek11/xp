import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import brushIcon from "../../../../../assets/paint/brush.png";
import { BrushSize } from "../../models";
import {
  fillRect,
  fillSpaceBeetwenPoints,
  fillBrushMediumCircle,
  fillBrushBigCircle,
  drawLine
} from "../../../../../utils/paint";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  lastX: number;
  lastY: number;
};

export class Brush extends Component<CtxProps, State> {
  readonly state: State = {
    lastX: 0,
    lastY: 0
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (x: number, y: number) => {
    this.setColor();
    this.draw(x, y);
    this.setState({ lastX: x, lastY: y });
  };

  handleMouseMove = (x: number, y: number) => {
    const { lastX, lastY } = this.state;

    fillSpaceBeetwenPoints(lastX, lastY, x, y, this.draw);
    this.draw(x, y);
    this.setState({ lastX: x, lastY: y });
  };

  draw = (x: number, y: number) => {
    const { type } = this.props.paint.options.brush;

    if (type === "circle") this.drawCircle(x, y);
    else if (type === "rect") this.drawRect(x, y);
    else if (type === "slash") this.drawSlash(x, y, true);
    else this.drawSlash(x, y, false);
  };

  drawCircle = (x: number, y: number) => {
    const { canvasCtx, options } = this.props.paint;
    const { size } = options.brush;

    if (size === BrushSize.Small) fillRect(x, y, 1, canvasCtx!);
    else if (size === BrushSize.Medium) fillBrushMediumCircle(x, y, canvasCtx!);
    else fillBrushBigCircle(x, y, canvasCtx!);
  };

  drawRect = (x: number, y: number) => {
    const { canvasCtx, options } = this.props.paint;
    fillRect(x, y, options.brush.size, canvasCtx!);
  };

  drawSlash = (x: number, y: number, forward: boolean) => {
    const { canvasCtx, options } = this.props.paint;
    const lineLength = options.brush.size + 1;
    const halfLineLength = lineLength / 2;

    const startX = Math.floor(x - halfLineLength * (forward ? 1 : -1));
    const startY = Math.floor(y + halfLineLength);
    const endX = Math.ceil(x + halfLineLength * (forward ? 1 : -1));
    const endY = Math.ceil(y - halfLineLength);

    drawLine(startX, startY, endX, endY, 2, canvasCtx!);
  };

  setColor = () => {
    const { primaryColor, canvasCtx } = this.props.paint;

    canvasCtx!.strokeStyle = primaryColor;
    canvasCtx!.fillStyle = primaryColor;
  };

  render() {
    return (
      <Tool
        icon={brushIcon}
        toolType="brush"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        data-test="tool"
      />
    );
  }
}

export default withContext(Brush, "paint");
