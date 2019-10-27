import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { fillRect, fillSpaceBetweenPoints } from "../../../../../utils/paint";

import pencilIcon from "../../../../../assets/paint/pencil.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  lastPoint: Vector;
};

export class Pencil extends Component<CtxProps, State> {
  readonly state: State = {
    lastPoint: Vector.Zero
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (canvasPos: Vector, isLeft: boolean) => {
    const { setColor } = this.props.paint;

    setColor(isLeft);
    this.setState({ lastPoint: canvasPos });
    this.draw(canvasPos);
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { lastPoint } = this.state;

    fillSpaceBetweenPoints(lastPoint, canvasPos, this.draw);
    this.draw(canvasPos);
    this.setState({ lastPoint: canvasPos });
  };

  draw = (canvasPos: Vector) => {
    fillRect(canvasPos, 1, this.props.paint.canvasCtx!);
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
