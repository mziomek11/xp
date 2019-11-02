import React, { Component, createRef } from "react";

import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { canvasClass } from "../classes";
import { getClassName, areObjectsEqual } from "../../../../utils";

type OwnProps = {
  width: number;
  height: number;
};

type CtxProps = {
  paint: PaintContextType;
};

type Props = OwnProps & CtxProps;

export class MainCanvas extends Component<Props> {
  private canvasRef = createRef<HTMLCanvasElement>();

  shouldComponentUpdate(nextProps: Props) {
    return !areObjectsEqual(this.props, nextProps, ["width", "height"]);
  }

  componentDidMount() {
    const { width, height } = this.props;
    const { canvasRef } = this;
    if (!canvasRef.current) return;

    const cvsCtx = canvasRef.current.getContext("2d") as any;
    cvsCtx.fillStyle = "#ffffff";
    cvsCtx.fillRect(0, 0, width, height);

    this.props.paint.setContext({ canvasCtx: cvsCtx });
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        className={getClassName(canvasClass, {}, ["main"])}
        width={width}
        height={height}
        ref={this.canvasRef}
        data-test="canvas"
      />
    );
  }
}

export default withContext(MainCanvas, "paint");
