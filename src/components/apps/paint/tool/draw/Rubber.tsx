import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { fillRect, fillSpaceBeetwenPoints } from "../../../../../utils/paint";

import rubberIcon from "../../../../../assets/paint/rubber.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  lastX: number;
  lastY: number;
};

export class Rubber extends Component<CtxProps, State> {
  readonly state = {
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

  setColor = () => {
    const { secondaryColor, canvasCtx } = this.props.paint;

    canvasCtx!.fillStyle = secondaryColor;
    canvasCtx!.strokeStyle = secondaryColor;
  };

  draw = (x: number, y: number) => {
    const { options, canvasCtx } = this.props.paint;
    fillRect(x, y, options.rubberSize, canvasCtx!);
  };

  render() {
    return (
      <Tool
        icon={rubberIcon}
        toolType="rubber"
        data-test="tool"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default withContext(Rubber, "paint");
