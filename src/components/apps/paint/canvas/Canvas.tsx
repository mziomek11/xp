import React, { Component, createRef } from "react";

import withContext from "../../../../hoc/withContext";
import Resizer from "./Resizer";
import { PaintContextType } from "ContextType";
import { canvasClass } from "../classes";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  width: number;
  height: number;
};

export class Canvas extends Component<CtxProps, State> {
  private canvasRef = createRef<HTMLCanvasElement>();

  readonly state: State = {
    width: 200,
    height: 200
  };

  shouldComponentUpdate(_: CtxProps, nextState: State) {
    const { width, height } = this.state;

    return width !== nextState.width || height !== nextState.height;
  }

  componentDidMount() {
    if (!this.canvasRef.current) return;

    type CanvasContext = CanvasRenderingContext2D;
    const { width, height } = this.state;

    const canvasCtx = this.canvasRef.current.getContext("2d") as CanvasContext;
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(0, 0, width, height);

    this.props.paint.setContext({ canvasCtx });
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
    const { width, height } = this.state;
    const size = { width, height, resize: this.resize };

    return (
      <div className="paint__canvas-container" data-test="canvas">
        <canvas
          className={canvasClass}
          width={width}
          height={height}
          ref={this.canvasRef}
        />

        <Resizer isVertical={false} isHorizontal {...size} data-test="E" />
        <Resizer isVertical isHorizontal={false} {...size} data-test="S" />
        <Resizer isVertical isHorizontal {...size} data-test="SE" />
      </div>
    );
  }
}

export default withContext(Canvas, "paint");
