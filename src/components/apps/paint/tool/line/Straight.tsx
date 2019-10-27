import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { LineProps } from "./Line";
import { fillSpaceBetweenPoints } from "../../../../../utils/paint";

import straightIcon from "../../../../../assets/paint/straight.png";

type CtxProps = {
  paint: PaintContextType;
};

type Props = CtxProps & LineProps;

type State = {
  startPos: Vector;
};

export class Straight extends Component<Props, State> {
  readonly state: State = {
    startPos: Vector.Zero
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (canvasPos: Vector, isLeft: boolean) => {
    const { setContext, setColor } = this.props.paint;

    setContext({ showTempCanvas: true });
    setColor(isLeft);
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
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Straight, "paint");
