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

export class TempCanvas extends Component<Props> {
  private canvasRef = createRef<HTMLCanvasElement>();

  shouldComponentUpdate(nextProps: Props) {
    return (
      !areObjectsEqual(this.props, nextProps, ["width", "height"]) ||
      !areObjectsEqual(this.props.paint, nextProps.paint, ["showTempCanvas"])
    );
  }

  componentDidMount() {
    const { canvasRef } = this;
    if (!canvasRef.current) return;

    const tempCvsCtx = canvasRef.current.getContext("2d") as any;
    this.props.paint.setContext({ tempCanvasCtx: tempCvsCtx });
  }

  getInlineStyles = (): React.CSSProperties => {
    const { showTempCanvas } = this.props.paint;
    return {
      display: showTempCanvas ? "block" : "none"
    };
  };

  render() {
    const { width, height } = this.props;
    const inlineStyles = this.getInlineStyles();

    return (
      <canvas
        className={getClassName(canvasClass, {}, ["temp"])}
        style={inlineStyles}
        width={width}
        height={height}
        ref={this.canvasRef}
        data-test="canvas"
      />
    );
  }
}

export default withContext(TempCanvas, "paint");
