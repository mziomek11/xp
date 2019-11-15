import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import Resizer from "./resizer/Resizer";
import MainCanvas from "./Main";
import TempCanvas from "./Temp";
import TextArea from "./TextArea";
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
    height: 400
  };

  shouldComponentUpdate({ paint }: CtxProps, nextState: State) {
    const { select, zoom } = this.props.paint.options;
    return (
      !areObjectsEqual(this.state, nextState, ["width", "height"]) ||
      !areObjectsEqual(select, paint.options.select, ["isRect", "isText"]) ||
      zoom !== paint.options.zoom
    );
  }

  resize = (newWidth: number, newHeight: number) => {
    const { canvasCtx, options } = this.props.paint;
    const { zoom } = options;
    const { width, height } = this.state;
    const imageData = canvasCtx!.getImageData(0, 0, width, height);

    const adjustedWidth = Math.round(newWidth / zoom);
    const adjustedHeight = Math.round(newHeight / zoom);

    this.setState({ width: adjustedWidth, height: adjustedHeight });
    this.redraw(imageData);
  };

  initialResize = (newWidth: number, newHeight: number) => {
    this.setState({ width: newWidth, height: newHeight });
  };

  redraw = (oldImageData: ImageData) => {
    const { canvasCtx, secondaryColor } = this.props.paint;
    const { width, height } = this.state;

    canvasCtx!.fillStyle = secondaryColor;
    canvasCtx!.fillRect(0, 0, width, height);
    canvasCtx!.putImageData(oldImageData, 0, 0);
  };

  render() {
    const { select, zoom } = this.props.paint.options;
    const { isRect, isText } = select;
    const { width, height } = this.state;
    const size = {
      width: width * zoom,
      height: height * zoom,
      resize: this.resize
    };

    return (
      <div className="paint__canvas-container" data-test="canvas">
        <MainCanvas
          width={width}
          height={height}
          resize={this.initialResize}
          data-test="main"
        />
        <TempCanvas width={width} height={height} data-test="temp" />

        {isText && <TextArea data-test="textarea" />}
        {!isRect && (
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
