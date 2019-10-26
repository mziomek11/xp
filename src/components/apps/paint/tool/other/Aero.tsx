import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { deepCopy } from "../../../../../utils";
import { AeroSize } from "../../models";
import { pickRandomItemsFromArray } from "../../../../../utils";
import {
  getAeroSmallVectors,
  getAeroMediumVectors,
  getAeroBigVectors,
  Vector,
  fillRect
} from "../../../../../utils/paint";

import aeroIcon from "../../../../../assets/paint/aero.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  mousePos: Vector;
  interval: NodeJS.Timeout | null;
  isMouseButtonLeft: boolean;
};

const smallVectors = getAeroSmallVectors();
const mediumVector = getAeroMediumVectors();
const bigVectors = getAeroBigVectors();

const vectorPercentToPick: number = 15;
const msBetweenDraws: number = 50;

export class Aero extends Component<CtxProps, State> {
  readonly state: State = {
    mousePos: { x: 0, y: 0 },
    interval: null,
    isMouseButtonLeft: true
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  handleMouseLeftDown = (canvasPos: Vector) => {
    this.setState({ isMouseButtonLeft: true });
    this.handleMouseDown(canvasPos);
  };

  handleMouseRightDown = (canvasPos: Vector) => {
    this.setState({ isMouseButtonLeft: false });
    this.handleMouseDown(canvasPos);
  };

  handleMouseDown = (mousePos: Vector) => {
    const { setColor } = this.props.paint;

    this.clearInterval();
    setColor(this.state.isMouseButtonLeft);

    const interval = setInterval(this.draw, msBetweenDraws);
    this.setState({ mousePos, interval });
  };

  handleMouseMove = (mousePos: Vector) => {
    this.setState({ mousePos });
  };

  clearInterval = () => {
    clearInterval(this.state.interval!);
    this.setState({ interval: null });
  };

  draw = () => {
    const { mousePos } = this.state;
    const { canvasCtx } = this.props.paint;
    const vectors = this.getVectorArray();
    const pickedVects = pickRandomItemsFromArray(vectors, vectorPercentToPick);

    pickedVects.forEach(({ x, y }) => {
      fillRect({ x: mousePos.x + x, y: mousePos.y + y }, 1, canvasCtx!);
    });
  };

  getVectorArray = (): Vector[] => {
    const { aeroSize } = this.props.paint.options;

    if (aeroSize === AeroSize.Small) return deepCopy(smallVectors);
    else if (aeroSize === AeroSize.Medium) return deepCopy(mediumVector);
    else return deepCopy(bigVectors);
  };

  render() {
    return (
      <Tool
        icon={aeroIcon}
        toolType="aero"
        onMouseLeftDown={this.handleMouseLeftDown}
        onMouseRightDown={this.handleMouseRightDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.clearInterval}
        data-test="tool"
      />
    );
  }
}

export default withContext(Aero, "paint");
