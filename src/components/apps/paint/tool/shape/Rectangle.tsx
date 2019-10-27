import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import rectIcon from "../../../../../assets/paint/rect.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  startPoint: Vector;
  isMouseButtonLeft: boolean;
};

export class Rectangle extends Component<CtxProps, State> {
  readonly state: State = {
    startPoint: Vector.Zero,
    isMouseButtonLeft: true
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (canvasPos: Vector, isLeft: boolean) => {
    const { setContext } = this.props.paint;

    setContext({ showTempCanvas: true });
    this.setState({ startPoint: canvasPos, isMouseButtonLeft: isLeft });
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { tempCanvasCtx, clearTempCanvas } = this.props.paint;

    clearTempCanvas();
    this.draw(canvasPos, tempCanvasCtx!);
  };

  handleMouseUp = (canvasPos: Vector) => {
    const { canvasCtx, clearTempCanvas, setContext } = this.props.paint;

    clearTempCanvas();
    setContext({ showTempCanvas: false });
    this.draw(canvasPos, canvasCtx!);
  };

  draw = (endPoint: Vector, ctx: CanvasRenderingContext2D) => {
    const { setColor, options } = this.props.paint;
    const { startPoint, isMouseButtonLeft } = this.state;
    const { rect } = options.shapeDrawMode;
    const [width, height] = Vector.getXYDistance(startPoint, endPoint);

    if (rect === "fill") {
      setColor(isMouseButtonLeft);
      ctx.fillRect(startPoint.x, startPoint.y, width, height);
    }

    if (rect === "both") {
      setColor(!isMouseButtonLeft);
      ctx.fillRect(startPoint.x, startPoint.y, width, height);
    }

    if (rect === "both" || rect === "stroke") {
      setColor(isMouseButtonLeft);
      ctx.strokeRect(startPoint.x - 0.5, startPoint.y - 0.5, width, height);
    }
  };

  render() {
    return (
      <Tool
        icon={rectIcon}
        toolType="rect"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Rectangle, "paint");
