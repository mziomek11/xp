import React, { Component } from "react";

import Tool from "../Tool";
import V from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import {
  fillEllipse,
  strokeEllpiseQuarter,
  line
} from "../../../../../utils/paint";

import roundedIcon from "../../../../../assets/paint/rounded.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  startPoint: V;
  isMouseButtonLeft: boolean;
};

export const cornerRadius: number = 8;

export class Rounded extends Component<CtxProps, State> {
  readonly state: State = {
    startPoint: V.Zero,
    isMouseButtonLeft: true
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (canvasPos: V, isLeft: boolean) => {
    const { setContext } = this.props.paint;

    setContext({ showTempCanvas: true });
    this.setState({ startPoint: canvasPos, isMouseButtonLeft: isLeft });
  };

  handleMouseMove = (canvasPos: V) => {
    const { tempCanvasCtx, clearTempCanvas } = this.props.paint;

    clearTempCanvas();
    this.draw(canvasPos, tempCanvasCtx!);
  };

  handleMouseUp = (canvasPos: V) => {
    const { canvasCtx, clearTempCanvas, setContext } = this.props.paint;

    clearTempCanvas();
    setContext({ showTempCanvas: false });
    this.draw(canvasPos, canvasCtx!);
  };

  draw = (canvasPos: V, ctx: CanvasRenderingContext2D) => {
    const { setColor, options } = this.props.paint;
    const { rounded } = options.shapeDrawMode;
    const { isMouseButtonLeft } = this.state;

    const [minV, maxV] = this.getMinAndMaxVectors(canvasPos);
    const [rx, ry] = this.getXYradius(canvasPos);
    const [cornNW, cornSE] = this.getNWAndSECircleCenters(minV, maxV, rx, ry);

    if (rx === 0 || ry === 0) return;

    if (rounded === "fill") {
      setColor(isMouseButtonLeft);
      this.fill(minV, maxV, cornNW, cornSE, rx, ry, ctx);
    }

    if (rounded === "both") {
      setColor(!isMouseButtonLeft);
      this.fill(minV, maxV, cornNW, cornSE, rx, ry, ctx);
    }

    if (rounded === "both" || rounded === "stroke") {
      setColor(isMouseButtonLeft);
      this.stroke(minV, maxV, cornNW, cornSE, rx, ry, ctx);
    }
  };

  getMinAndMaxVectors = (endV: V): [V, V] => {
    const { min, max } = Math;
    const { startPoint } = this.state;

    const minV = new V(min(startPoint.x, endV.x), min(startPoint.y, endV.y));
    const maxV = new V(max(startPoint.x, endV.x), max(startPoint.y, endV.y));

    return [minV, maxV];
  };

  getXYradius = (endV: V): [number, number] => {
    const { floor, abs, min } = Math;
    const { startPoint } = this.state;

    const rx = min(floor(abs(startPoint.x - endV.x) / 2), cornerRadius);
    const ry = min(floor(abs(startPoint.y - endV.y) / 2), cornerRadius);

    return [rx, ry];
  };

  getNWAndSECircleCenters = (
    minV: V,
    maxV: V,
    rx: number,
    ry: number
  ): [V, V] => {
    const cornerNW = new V(minV.x + rx, minV.y + ry);
    const cornerSE = new V(maxV.x - rx, maxV.y - ry);

    return [cornerNW, cornerSE];
  };

  stroke = (
    minV: V,
    maxV: V,
    cornerNW: V,
    cornerSE: V,
    rx: number,
    ry: number,
    ctx: CanvasRenderingContext2D
  ) => {
    this.strokeCorners(cornerNW, cornerSE, rx, ry, ctx);
    this.strokeLines(cornerNW, cornerSE, minV, maxV, ctx);
  };

  strokeCorners = (
    cornerNW: V,
    cornerSE: V,
    rx: number,
    ry: number,
    ctx: CanvasRenderingContext2D
  ) => {
    strokeEllpiseQuarter(cornerSE, rx, ry, 1, false, false, ctx);
    strokeEllpiseQuarter(cornerNW, rx, ry, 1, true, true, ctx);

    const cornerSW = new V(cornerNW.x, cornerSE.y);
    strokeEllpiseQuarter(cornerSW, rx, ry, 1, true, false, ctx);

    const cornerNE = new V(cornerSE.x, cornerNW.y);
    strokeEllpiseQuarter(cornerNE, rx, ry, 1, false, true, ctx);
  };

  strokeLines = (
    cornerNW: V,
    cornerSE: V,
    min: V,
    max: V,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.translate(-0.5, 0);
    line(new V(min.x, cornerNW.y), new V(min.x, cornerSE.y), 1, ctx);
    line(new V(max.x, cornerNW.y), new V(max.x, cornerSE.y), 1, ctx);

    ctx.translate(0.5, -0.5);
    line(new V(cornerNW.x, max.y), new V(cornerSE.x, max.y), 1, ctx);
    line(new V(cornerNW.x, min.y), new V(cornerSE.x, min.y), 1, ctx);

    ctx.translate(0.0, 0.5);
  };

  fill = (
    minV: V,
    maxV: V,
    cornerNW: V,
    cornerSE: V,
    rx: number,
    ry: number,
    ctx: CanvasRenderingContext2D
  ) => {
    this.fillCorners(cornerNW, cornerSE, rx, ry, ctx);
    this.fillRest(minV, maxV, cornerNW, cornerSE, ctx);
  };

  fillCorners = (
    cornerNW: V,
    cornerSE: V,
    rx: number,
    ry: number,
    ctx: CanvasRenderingContext2D
  ) => {
    fillEllipse(cornerSE, rx, ry, ctx);
    fillEllipse(cornerNW, rx, ry, ctx);

    const cornerSW = new V(cornerNW.x, cornerSE.y);
    fillEllipse(cornerSW, rx, ry, ctx);

    const cornerNE = new V(cornerSE.x, cornerNW.y);
    fillEllipse(cornerNE, rx, ry, ctx);
  };

  fillRest = (
    minV: V,
    maxV: V,
    cNW: V,
    cSE: V,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.fillRect(cNW.x, minV.y, cSE.x - cNW.x, maxV.y - minV.y);
    ctx.fillRect(minV.x - 1, cNW.y, maxV.x - minV.x + 1, cSE.y - cNW.y);
  };

  render() {
    return (
      <Tool
        icon={roundedIcon}
        toolType="rounded"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Rounded, "paint");
