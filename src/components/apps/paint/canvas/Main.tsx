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
    const { zoom } = this.props.paint.options;
    return (
      !areObjectsEqual(this.props, nextProps, ["width", "height"]) ||
      nextProps.paint.options.zoom !== zoom
    );
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

  getInlineStyles = (): React.CSSProperties => {
    const { zoom } = this.props.paint.options;
    const { width, height } = this.props;

    const styles = {
      width: width * zoom,
      height: height * zoom
    };

    return styles;
  };

  render() {
    const { width, height } = this.props;
    const styles = this.getInlineStyles();

    return (
      <canvas
        className={getClassName(canvasClass, {}, ["main"])}
        width={width}
        height={height}
        style={styles}
        ref={this.canvasRef}
        data-test="canvas"
      />
    );
  }
}

export default withContext(MainCanvas, "paint");
