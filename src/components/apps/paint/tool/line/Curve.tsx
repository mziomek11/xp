import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { LineProps } from "./Line";
import { fillSpaceBetweenPoints, bezier2D } from "../../../../../utils/paint";

import curveIcon from "../../../../../assets/paint/curve.png";

type CtxProps = {
  paint: PaintContextType;
};

type Props = CtxProps & LineProps;

type State = {
  startPoint: Vector;
  firstControlPoint: Vector;
  endPoint: Vector;
  imageCopy: ImageData | null;
  isMouseButtonLeft: boolean;
  drawPhase: number;
};

export class Curve extends Component<Props, State> {
  readonly state: State = {
    startPoint: Vector.Zero,
    firstControlPoint: Vector.Zero,
    endPoint: Vector.Zero,
    imageCopy: null,
    isMouseButtonLeft: true,
    drawPhase: 0
  };

  shouldComponentUpdate() {
    return false;
  }

  handleToolChange = () => {
    this.setState({ drawPhase: 0, imageCopy: null });
  };

  handleMouseDown = (canvasPos: Vector, isLeft: boolean) => {
    const { setContext } = this.props.paint;
    setContext({ showTempCanvas: true });

    const drawPhase = this.state.drawPhase + 1;
    this.setState({ drawPhase, isMouseButtonLeft: isLeft });

    if (drawPhase === 1) this.handleFirstMouseDown(canvasPos);
    else if (drawPhase === 2) this.handleSecondMouseDown(canvasPos);
    else this.handleThirdMouseDown(canvasPos);
  };

  handleFirstMouseDown = (startPoint: Vector) => {
    const { setColor } = this.props.paint;

    setColor(this.state.isMouseButtonLeft);
    this.setState({ startPoint });
  };

  handleSecondMouseDown = (firstPoint: Vector) => {
    const { drawOnTempCanvas } = this.props;

    this.pasteImageData();
    this.drawBezierWithPointsBetween([firstPoint], drawOnTempCanvas);
  };

  handleThirdMouseDown = (secondPoint: Vector) => {
    const { drawOnTempCanvas } = this.props;
    const { firstControlPoint } = this.state;

    this.pasteImageData();
    const pointsBetween: Vector[] = [firstControlPoint, secondPoint];
    this.drawBezierWithPointsBetween(pointsBetween, drawOnTempCanvas);
  };

  copyImageData = () => {
    const { canvasCtx } = this.props.paint;
    const { width, height } = canvasCtx!.canvas;

    const imageCopy = canvasCtx!.getImageData(0, 0, width, height);
    this.setState({ imageCopy });
  };

  pasteImageData = () => {
    const { imageCopy } = this.state;

    this.props.paint.canvasCtx!.putImageData(imageCopy!, 0, 0);
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { clearTempCanvas } = this.props.paint;
    const { drawPhase } = this.state;

    clearTempCanvas();
    if (drawPhase === 1) this.handleFirstMouseMove(canvasPos);
    else if (drawPhase === 2) this.handleSecondMouseMove(canvasPos);
    else this.handleThrirdMouseMove(canvasPos);
  };

  handleFirstMouseMove = (endPoint: Vector) => {
    const { drawOnTempCanvas } = this.props;
    const { startPoint } = this.state;

    fillSpaceBetweenPoints(startPoint, endPoint, drawOnTempCanvas);
  };

  handleSecondMouseMove = (firstPoint: Vector) => {
    const { drawOnTempCanvas } = this.props;

    this.drawBezierWithPointsBetween([firstPoint], drawOnTempCanvas);
  };

  handleThrirdMouseMove = (secondPoint: Vector) => {
    const { drawOnTempCanvas } = this.props;
    const { firstControlPoint } = this.state;

    const pointsBetween = [firstControlPoint, secondPoint];
    this.drawBezierWithPointsBetween(pointsBetween, drawOnTempCanvas);
  };

  handleMouseUp = (canvasPos: Vector) => {
    const { setContext, clearTempCanvas } = this.props.paint;
    const { drawPhase } = this.state;

    clearTempCanvas();
    setContext({ showTempCanvas: false });

    if (drawPhase === 1) this.handleFirstMouseUp(canvasPos);
    else if (drawPhase === 2) this.handleSecondMouseUp(canvasPos);
    else this.handleThirdMouseUp(canvasPos);
  };

  handleFirstMouseUp = (endPoint: Vector) => {
    const { drawOnRealCanvas } = this.props;
    const { startPoint } = this.state;

    this.copyImageData();
    this.setState({ endPoint });
    fillSpaceBetweenPoints(startPoint, endPoint, drawOnRealCanvas);
  };

  handleSecondMouseUp = (firstPoint: Vector) => {
    const { drawOnRealCanvas } = this.props;
    this.copyImageData();
    this.setState({ firstControlPoint: firstPoint });
    this.drawBezierWithPointsBetween([firstPoint], drawOnRealCanvas);
  };

  handleThirdMouseUp = (secondPoint: Vector) => {
    const { drawOnRealCanvas } = this.props;
    const { firstControlPoint } = this.state;

    this.setState({ drawPhase: 0, imageCopy: null });
    const pointsBetween: Vector[] = [firstControlPoint, secondPoint];
    this.drawBezierWithPointsBetween(pointsBetween, drawOnRealCanvas);
  };

  drawBezierWithPointsBetween = (
    pointsBetween: Vector[],
    fillFn: (canvasPos: Vector) => void
  ) => {
    const { startPoint, endPoint } = this.state;
    const points = [startPoint, ...pointsBetween, endPoint];
    const bezierPoints = bezier2D(points, 100);

    let lastPoint: Vector = { ...startPoint };
    for (let i = 1; i < bezierPoints.length; i++) {
      const currentPoint = bezierPoints[i];
      fillSpaceBetweenPoints(lastPoint, currentPoint, fillFn, true);

      lastPoint = { ...currentPoint };
    }
  };

  render() {
    return (
      <Tool
        icon={curveIcon}
        toolType="curve"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onToolChange={this.handleToolChange}
        data-test="tool"
      />
    );
  }
}

export default withContext(Curve, "paint");
