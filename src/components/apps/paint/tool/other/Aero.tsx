import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { AeroSize } from "../../models";
import { pickPercentRandomItemsFromArray } from "../../../../../utils";
import { fillRect, getFillEllipsePoints } from "../../../../../utils/paint";

import aeroIcon from "../../../../../assets/paint/aero.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  mousePos: Vector;
  interval: NodeJS.Timeout | null;
};

const smallVectors = getFillEllipsePoints(2, 2);
const mediumVector = getFillEllipsePoints(7, 7);
const bigVectors = getFillEllipsePoints(11, 11);

const vectorPercentToPick: number = 10;
const msBetweenDraws: number = 50;

export class Aero extends Component<CtxProps, State> {
  readonly state: State = {
    mousePos: Vector.Zero,
    interval: null
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  handleMouseDown = (mousePos: Vector, isLeft: boolean) => {
    const { setColor } = this.props.paint;

    this.clearInterval();
    setColor(isLeft);

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
    const pickedVects = pickPercentRandomItemsFromArray(
      vectors,
      vectorPercentToPick
    );

    pickedVects.forEach(({ x, y }) => {
      fillRect({ x: mousePos.x + x, y: mousePos.y + y }, 1, canvasCtx!);
    });
  };

  getVectorArray = (): Vector[] => {
    const { aeroSize } = this.props.paint.options;

    if (aeroSize === AeroSize.Small) return smallVectors;
    else if (aeroSize === AeroSize.Medium) return mediumVector;
    else return bigVectors;
  };

  render() {
    return (
      <Tool
        icon={aeroIcon}
        toolType="aero"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.clearInterval}
        data-test="tool"
      />
    );
  }
}

export default withContext(Aero, "paint");
