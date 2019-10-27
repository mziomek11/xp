import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { strokeEllipse, fillEllipse } from "../../../../../utils/paint";

import circleIcon from "../../../../../assets/paint/circle.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  startPoint: Vector;
  isMouseButtonLeft: boolean;
};

export class Circle extends Component<CtxProps, State> {
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
    const { circle } = options.shapeDrawMode;

    const [width, height] = Vector.getXYDistance(startPoint, endPoint);
    const center = Vector.add(startPoint, new Vector(width / 2, height / 2));

    const radiusX = Math.round(Math.abs(startPoint.x - endPoint.x) / 2);
    const radiusY = Math.round(Math.abs(startPoint.y - endPoint.y) / 2);

    if (circle === "fill") {
      setColor(isMouseButtonLeft);
      fillEllipse(center, radiusX, radiusY, ctx);
    }

    if (circle === "both") {
      setColor(!isMouseButtonLeft);
      fillEllipse(center, radiusX, radiusY, ctx);
    }

    if (circle === "both" || circle === "stroke") {
      setColor(isMouseButtonLeft);
      strokeEllipse(center, radiusX, radiusY, 1, ctx);
    }
  };

  render() {
    return (
      <Tool
        icon={circleIcon}
        toolType="circle"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Circle, "paint");
