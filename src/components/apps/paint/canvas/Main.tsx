import React, { Component, createRef } from "react";

import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { canvasClass } from "../classes";
import { getClassName } from "../../../../utils";

type OwnProps = {
  width: number;
  height: number;
  resize: (width: number, height: number) => void;
};

type CtxProps = {
  paint: PaintContextType;
};

type Props = OwnProps & CtxProps;

export class MainCanvas extends Component<Props> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private insertImageOnUpdate: boolean = true;

  componentDidUpdate() {
    if (this.insertImageOnUpdate) {
      const { canvasCtx, startImage } = this.props.paint;

      if (startImage) canvasCtx!.putImageData(startImage, 0, 0);
      this.insertImageOnUpdate = false;
    }
  }

  componentDidMount() {
    const { paint, resize } = this.props;
    const { startImage } = paint;

    if (!this.canvasRef.current) return;
    const canvasContext = this.canvasRef.current.getContext("2d")!;
    paint.setContext({ canvasCtx: canvasContext });

    if (startImage) {
      const { width, height } = startImage;
      resize(width, height);
    } else this.initialFill(canvasContext);
  }

  initialFill = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = this.props;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  };

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
