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
  isMouseMoving: boolean;
  isMouseButtonLeft: boolean;
};

export class Brush extends Component<CtxProps, State> {
  readonly state: State = {
    lastX: 0,
    lastY: 0,
    isMouseMoving: false,
    isMouseButtonLeft: true
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (x: number, y: number) => {
    this.setState({ isMouseButtonLeft: true });
    this.initialDraw(x, y);
  };

  handleContextMenu = (x: number, y: number) => {
    this.setState({ isMouseButtonLeft: false });
    this.initialDraw(x, y);
  };

  initialDraw = (x: number, y: number) => {
    this.setColor();
    this.draw(x, y);
    this.setState({ lastX: x, lastY: y, isMouseMoving: true });
  };

  handleMouseMove = (x: number, y: number) => {
    const { lastX, lastY } = this.state;

    fillSpaceBeetwenPoints(lastX, lastY, x, y, this.draw);
    this.draw(x, y);
    this.setState({ lastX: x, lastY: y });
  };

  handleMouseUp = () => {
    this.setState({ isMouseMoving: false });
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
    const { isMouseMoving } = this.state;
    const { canvasCtx } = this.props.paint;
    const lineLength = this.getSlashLineLength();
    const halfLineLength = lineLength / 2;

    const startX = Math.floor(x - halfLineLength * (forward ? 1 : -1));
    const startY = Math.floor(y + halfLineLength);
    const endX = Math.ceil(x + halfLineLength * (forward ? 1 : -1));
    const endY = Math.ceil(y - halfLineLength);

    drawLine(startX, startY, endX, endY, 1, canvasCtx!);

    if (isMouseMoving) {
      drawLine(startX - 1, startY, endX - 1, endY, 1, canvasCtx!);
      drawLine(startX + 1, startY, endX + 1, endY, 1, canvasCtx!);
    }
  };

  getSlashLineLength = () => {
    const { size } = this.props.paint.options.brush;

    if (size === BrushSize.Small) return 4;
    else if (size === BrushSize.Medium) return 6;
    else return 8;
  };

  setColor = () => {
    const { primaryColor, secondaryColor, canvasCtx } = this.props.paint;
    const { isMouseButtonLeft } = this.state;
    const newColor = isMouseButtonLeft ? primaryColor : secondaryColor;

    canvasCtx!.strokeStyle = newColor;
    canvasCtx!.fillStyle = newColor;
  };

  render() {
    return (
      <Tool
        icon={brushIcon}
        toolType="brush"
        onMouseDown={this.handleMouseDown}
        onContextMenu={this.handleContextMenu}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Brush, "paint");
