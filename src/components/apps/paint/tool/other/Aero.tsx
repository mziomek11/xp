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
  mouseX: number;
  mouseY: number;
  interval: NodeJS.Timeout | null;
};

const smallVectors = getAeroSmallVectors();
const mediumVector = getAeroMediumVectors();
const bigVectors = getAeroBigVectors();

const vectorPercentToPick: number = 15;
const msBetweenDraws: number = 50;

export class Aero extends Component<CtxProps, State> {
  readonly state: State = {
    mouseX: 0,
    mouseY: 0,
    interval: null
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  handleMouseDown = (x: number, y: number) => {
    this.setColor();
    const interval = setInterval(this.draw, msBetweenDraws);
    this.setState({ mouseX: x, mouseY: y, interval: interval });
  };

  handleMouseMove = (x: number, y: number) => {
    this.setState({ mouseX: x, mouseY: y });
  };

  clearInterval = () => {
    clearInterval(this.state.interval!);
    this.setState({ interval: null });
  };

  draw = () => {
    const { mouseX, mouseY } = this.state;
    const { canvasCtx } = this.props.paint;
    const vectors = this.getVectorArray();
    const pickedVects = pickRandomItemsFromArray(vectors, vectorPercentToPick);

    pickedVects.forEach(({ x, y }) => {
      fillRect(mouseX + x, mouseY + y, 1, canvasCtx!);
    });
  };

  getVectorArray = (): Vector[] => {
    const { aeroSize } = this.props.paint.options;

    if (aeroSize === AeroSize.Small) return deepCopy(smallVectors);
    else if (aeroSize === AeroSize.Medium) return deepCopy(mediumVector);
    else return deepCopy(bigVectors);
  };

  setColor = () => {
    const { primaryColor, canvasCtx } = this.props.paint;

    canvasCtx!.fillStyle = primaryColor;
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
