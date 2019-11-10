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

  getInlineStyles = (): React.CSSProperties => {
    const { showTempCanvas, options } = this.props.paint;
    const { isSelecting } = options.select;
    const { lastCanvasPos } = this.state;

    const styles: React.CSSProperties = {};
    styles.display = showTempCanvas ? "block" : "none";

    if (isSelecting) {
      styles.left = lastCanvasPos.x;
      styles.top = lastCanvasPos.y;
      styles.border = "1px dashed black";
    }

    return styles;
  };

  getWidthAndHeight = (): [number, number] => {
    const { isSelecting, size } = this.props.paint.options.select;
    if (isSelecting) return [size.x, size.y];
    else return [this.props.width, this.props.height];
  };

  handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { isSelecting, position } = this.props.paint.options.select;
    if (!isSelecting) return;

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
    const { x, y } = canvasPos;
    const { canvasCtx, options } = this.props.paint;
    const { width, height } = canvasCtx!.canvas;
    const { size } = options.select;

    const minX = -size.x - 2;
    const maxX = width;
    const minY = -size.y - 2;
    const maxY = height;

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
    const inlineStyles = this.getInlineStyles();

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
