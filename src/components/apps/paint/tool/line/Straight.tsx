import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { LineProps } from "./Line";
import { fillSpaceBetweenPoints, Vector } from "../../../../../utils/paint";

import straightIcon from "../../../../../assets/paint/straight.png";

type CtxProps = {
  paint: PaintContextType;
};

type Props = CtxProps & LineProps;

type State = {
  startPos: Vector;
  isMouseButtonLeft: boolean;
};

export class Straight extends Component<Props, State> {
  readonly state: State = {
    startPos: { x: 0, y: 0 },
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
    const { setContext, setColor } = this.props.paint;

    setContext({ showTempCanvas: true });
    setColor(this.state.isMouseButtonLeft);
    this.setState({ startPos: canvasPos });
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { paint, drawOnTempCanvas } = this.props;
    const { clearTempCanvas } = paint;
    const { startPos } = this.state;

    clearTempCanvas();
    fillSpaceBetweenPoints(startPos, canvasPos, drawOnTempCanvas, true);
  };

  handleMouseUp = (canvasPos: Vector) => {
    const { paint, drawOnRealCanvas } = this.props;
    const { setContext, clearTempCanvas } = paint;
    const { startPos } = this.state;

    clearTempCanvas();
    fillSpaceBetweenPoints(startPos, canvasPos, drawOnRealCanvas, true);
    setContext({ showTempCanvas: false });
  };

  render() {
    return (
      <Tool
        icon={straightIcon}
        toolType="line"
        onMouseLeftDown={this.handleMouseLeftDown}
        onMouseRightDown={this.handleMouseRightDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Straight, "paint");
