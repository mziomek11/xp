import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import Resizer from "./resizer/Resizer";
import MainCanvas from "./Main";
import TempCanvas from "./Temp";
import { PaintContextType } from "ContextType";
import { areObjectsEqual } from "../../../../utils";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  width: number;
  height: number;
};

export class Container extends Component<CtxProps, State> {
  readonly state: State = {
    width: 200,
    height: 200
  };

  shouldComponentUpdate(nextProps: CtxProps, nextState: State) {
    const { isSelecting } = this.props.paint.options.select;
    return (
      !areObjectsEqual(this.state, nextState, ["width", "height"]) ||
      isSelecting !== nextProps.paint.options.select.isSelecting
    );
  }

  resize = (newWidth: number, newHeight: number) => {
    const { canvasCtx } = this.props.paint;
    const { width, height } = this.state;
    const imageData = canvasCtx!.getImageData(0, 0, width, height);

    this.setState({ width: newWidth, height: newHeight });
    this.redraw(imageData);
  };

  redraw = (oldImageData: ImageData) => {
    const { canvasCtx, secondaryColor } = this.props.paint;
    const { width, height } = this.state;

    canvasCtx!.fillStyle = secondaryColor;
    canvasCtx!.fillRect(0, 0, width, height);
    canvasCtx!.putImageData(oldImageData, 0, 0);
  };

  render() {
    const { isSelecting } = this.props.paint.options.select;
    const { width, height } = this.state;
    const size = { width, height, resize: this.resize };

    return (
      <div className="paint__canvas-container" data-test="canvas">
        <MainCanvas width={width} height={height} data-test="main" />
        <TempCanvas width={width} height={height} data-test="temp" />

        {!isSelecting && (
          <>
            <Resizer isVertical={false} isHorizontal {...size} data-test="E" />
            <Resizer isVertical isHorizontal={false} {...size} data-test="S" />
            <Resizer isVertical isHorizontal {...size} data-test="SE" />
          </>
        )}
      </div>
    );
  }
}

export default withContext(Container, "paint");
