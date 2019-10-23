import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { fillRect, fillSpaceBeetwenPoints } from "../../../../../utils/paint";

import pencilIcon from "../../../../../assets/paint/pencil.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  lastX: number;
  lastY: number;
  isMouseButtonLeft: boolean;
};

export class Pencil extends Component<CtxProps, State> {
  readonly state: State = {
    lastX: 0,
    lastY: 0,
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
    this.setState({ lastX: x, lastY: y });
    this.draw(x, y);
  };

  handleMouseMove = (x: number, y: number) => {
    const { lastX, lastY } = this.state;

    this.setColor();
    fillSpaceBeetwenPoints(lastX, lastY, x, y, this.draw);
    this.draw(x, y);
    this.setState({ lastX: x, lastY: y });
  };

  draw = (x: number, y: number) => {
    fillRect(x, y, 1, this.props.paint.canvasCtx!);
  };

  setColor = () => {
    const { primaryColor, secondaryColor, canvasCtx } = this.props.paint;
    const { isMouseButtonLeft } = this.state;

    canvasCtx!.fillStyle = isMouseButtonLeft ? primaryColor : secondaryColor;
  };

  render() {
    return (
      <Tool
        icon={pencilIcon}
        toolType="pencil"
        onMouseDown={this.handleMouseDown}
        onContextMenu={this.handleContextMenu}
        onMouseMove={this.handleMouseMove}
        data-test="tool"
      />
    );
  }
}

export default withContext(Pencil, "paint");
