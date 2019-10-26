import React, { Component, createRef } from "react";

import withContext from "../../../../hoc/withContext";
import Resizer from "./Resizer";
import { PaintContextType } from "ContextType";
import { canvasClass } from "../classes";
import { getClassName } from "../../../../utils";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  width: number;
  height: number;
};

export class Canvas extends Component<CtxProps, State> {
  private cvsRef = createRef<HTMLCanvasElement>();
  private tempCvsRef = createRef<HTMLCanvasElement>();

  readonly state: State = {
    width: 200,
    height: 200
  };

  shouldComponentUpdate(nextProps: CtxProps, nextState: State) {
    const { width, height } = this.state;

    return (
      width !== nextState.width ||
      height !== nextState.height ||
      this.props.paint.showTempCanvas !== nextProps.paint.showTempCanvas
    );
  }

  componentDidMount() {
    const { cvsRef, tempCvsRef } = this;
    if (!cvsRef.current || !tempCvsRef.current) return;

    type CanvasContext = CanvasRenderingContext2D;
    const { width, height } = this.state;

    const tempCvsCtx = tempCvsRef.current.getContext("2d") as CanvasContext;
    const cvsCtx = cvsRef.current.getContext("2d") as CanvasContext;
    cvsCtx.fillStyle = "#ffffff";
    cvsCtx.fillRect(0, 0, width, height);

    this.props.paint.setContext({
      canvasCtx: cvsCtx,
      tempCanvasCtx: tempCvsCtx
    });
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

  getTempCanvasInlineStyle = (): React.CSSProperties => {
    const { showTempCanvas } = this.props.paint;
    return {
      display: showTempCanvas ? "block" : "none"
    };
  };

  render() {
    const { width, height } = this.state;
    const size = { width, height, resize: this.resize };
    const tempInlineStyle = this.getTempCanvasInlineStyle();

    return (
      <div className="paint__canvas-container" data-test="canvas">
        <canvas
          className={getClassName(canvasClass, {}, ["main"])}
          width={width}
          height={height}
          ref={this.cvsRef}
        />
        <canvas
          className={getClassName(canvasClass, {}, ["temp"])}
          style={tempInlineStyle}
          width={width}
          height={height}
          ref={this.tempCvsRef}
        />

        <Resizer isVertical={false} isHorizontal {...size} data-test="E" />
        <Resizer isVertical isHorizontal={false} {...size} data-test="S" />
        <Resizer isVertical isHorizontal {...size} data-test="SE" />
      </div>
    );
  }
}

export default withContext(Canvas, "paint");
