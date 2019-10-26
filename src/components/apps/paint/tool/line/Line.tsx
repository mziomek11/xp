import React, { Component } from "react";

import Straight from "./Straight";
import Curve from "./Curve";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { fillRect, Vector } from "../../../../../utils/paint";

export type LineProps = {
  drawOnTempCanvas: (v: Vector) => void;
  drawOnRealCanvas: (v: Vector) => void;
};

type OwnProps = {
  type: "curve" | "straight";
};

type CtxProps = {
  paint: PaintContextType;
};

type Props = OwnProps & CtxProps;

export class Line extends Component<Props> {
  shouldComponentUpdate() {
    return false;
  }

  drawOnTempCanvas = (canvasPos: Vector) => {
    this.draw(canvasPos, this.props.paint.tempCanvasCtx!);
  };

  drawOnRealCanvas = (canvasPos: Vector) => {
    this.draw(canvasPos, this.props.paint.canvasCtx!);
  };

  draw = (canvasPos: Vector, ctx: CanvasRenderingContext2D) => {
    fillRect(canvasPos, this.props.paint.options.lineWidth, ctx);
  };

  render() {
    const { type } = this.props;
    const { draw, drawOnRealCanvas, drawOnTempCanvas } = this;
    const props = { draw, drawOnRealCanvas, drawOnTempCanvas };
    if (type === "curve") return <Curve {...props} data-test="curve" />;
    else return <Straight {...props} data-test="straight" />;
  }
}

export default withContext(Line, "paint");
