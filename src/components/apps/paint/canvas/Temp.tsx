import React, { Component, createRef } from "react";

import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { canvasClass } from "../classes";
import { getClassName, areObjectsEqual } from "../../../../utils";
import Vector from "../../../../classes/Vector";

type OwnProps = {
  width: number;
  height: number;
};

type CtxProps = {
  paint: PaintContextType;
};

type Props = OwnProps & CtxProps;

type State = {
  lastMousePos: Vector;
  lastCanvasPos: Vector;
};

export class TempCanvas extends Component<Props, State> {
  private canvasRef = createRef<HTMLCanvasElement>();

  readonly state: State = {
    lastMousePos: Vector.Zero,
    lastCanvasPos: Vector.Zero
  };

  componentDidUpdate({ paint }: Props) {
    const { position } = this.props.paint.options.select;
    if (!areObjectsEqual(position, paint.options.select.position, ["x", "y"])) {
      this.setState({ lastCanvasPos: position });
    }
  }

  componentDidMount() {
    const { canvasRef } = this;
    if (!canvasRef.current) return;

    const tempCvsCtx = canvasRef.current.getContext("2d") as any;
    this.props.paint.setContext({ tempCanvasCtx: tempCvsCtx });
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  addListeners = () => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  getInlineStyles = (width: number, height: number): React.CSSProperties => {
    const { showTempCanvas, options } = this.props.paint;
    const { zoom, select } = options;
    const { isRect } = select;
    const { lastCanvasPos } = this.state;

    const styles: React.CSSProperties = {
      width: width * zoom,
      height: height * zoom
    };

    if (showTempCanvas) styles.display = "block";
    if (isRect) {
      styles.left = lastCanvasPos.x;
      styles.top = lastCanvasPos.y;
      styles.borderWidth = 1;
    }

    return styles;
  };

  getWidthAndHeight = (): [number, number] => {
    const { isRect, size } = this.props.paint.options.select;
    if (isRect) return [size.x, size.y];
    else return [this.props.width, this.props.height];
  };

  handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { select } = this.props.paint.options;
    const { isRect, position } = select;
    if (!isRect) return;

    const mousePos = this.getMousePosition(e);

    this.setState({ lastMousePos: mousePos, lastCanvasPos: position });
    this.addListeners();
  };

  handleMouseMove = (e: MouseEvent) => {
    const { lastMousePos, lastCanvasPos } = this.state;
    const mousePos = this.getMousePosition(e);
    const moveVector = Vector.sub(mousePos, lastMousePos);
    const canvasPos = Vector.add(lastCanvasPos, moveVector);
    const [adjCanvasPos, adjMousePos] = this.adjustCanvasAndMousePos(
      canvasPos,
      mousePos
    );

    this.setState({ lastMousePos: adjMousePos, lastCanvasPos: adjCanvasPos });
  };

  getMousePosition = (e: MouseEvent | React.MouseEvent): Vector => {
    return new Vector(Math.floor(e.screenX), Math.floor(e.screenY));
  };

  adjustCanvasAndMousePos = (
    canvasPos: Vector,
    mousePos: Vector
  ): [Vector, Vector] => {
    const { canvasCtx, options } = this.props.paint;
    const { width, height } = canvasCtx!.canvas;
    const { select, zoom } = options;
    const { size } = select;

    const { x, y } = canvasPos;

    const minX = -(size.x * zoom) - 1;
    const maxX = width * zoom;
    const minY = -(size.y * zoom) - 1;
    const maxY = height * zoom;

    const adjustedX = Math.min(Math.max(minX, x), maxX);
    const adjustedY = Math.min(Math.max(minY, y), maxY);

    const adjustedCanvasPos = new Vector(adjustedX, adjustedY);
    const adjustVector = Vector.sub(adjustedCanvasPos, canvasPos);
    const adjustedMousePos = Vector.add(mousePos, adjustVector);

    return [adjustedCanvasPos, adjustedMousePos];
  };

  handleMouseUp = () => {
    const { setSelectOptions } = this.props.paint;
    const { lastCanvasPos } = this.state;

    setSelectOptions({ position: lastCanvasPos });
    this.removeListeners();
  };

  render() {
    const [width, height] = this.getWidthAndHeight();
    const inlineStyles = this.getInlineStyles(width, height);

    return (
      <canvas
        className={getClassName(canvasClass, {}, ["temp"])}
        style={inlineStyles}
        width={width}
        height={height}
        ref={this.canvasRef}
        onMouseDown={this.handleMouseDown}
        data-test="canvas"
      />
    );
  }
}

export default withContext(TempCanvas, "paint");
