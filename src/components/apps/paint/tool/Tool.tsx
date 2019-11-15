import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import Vector from "../../../../classes/Vector";
import {
  getClassName,
  getWindowPosition,
  isMouseEvent
} from "../../../../utils";
import { Tool as ToolType } from "../models";
import { PaintContextType, WindowContextType } from "ContextType";
import { canvasClass } from "../classes";

type OwnProps = {
  icon: string;
  toolType: ToolType;
  onMouseDown?: (v: Vector, isLeft: boolean) => void;
  onMouseMove?: (v: Vector) => void;
  onMouseUp?: (v: Vector) => void;
  onToolChange?: VoidFunction;
  notImplemented?: boolean;
};

type CtxProps = {
  paint: PaintContextType;
  window: WindowContextType;
};

type State = {
  canvasLeft: number;
  canvasTop: number;
};

type Props = OwnProps & CtxProps;

export class Tool extends Component<Props, State> {
  readonly state: State = {
    canvasLeft: 0,
    canvasTop: 0
  };

  shouldComponentUpdate(nextProps: Props) {
    return this.props.paint.selectedTool !== nextProps.paint.selectedTool;
  }

  componentDidUpdate() {
    this.props.onToolChange && this.props.onToolChange();
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("contextmenu", this.handleContextMenu);
    window.addEventListener("touchstart", this.handleMouseDown);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("contextmenu", this.handleContextMenu);
    window.removeEventListener("touchstart", this.handleMouseDown);
    this.removeMoveAndUpListeners();
  }

  removeMoveAndUpListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("touchmove", this.handleMouseMove);
    window.removeEventListener("touchend", this.handleMouseUp);
  };

  handleMouseDown = (e: MouseEvent | TouchEvent) => {
    if (!this.clickedOwnCanvas(e)) return;
    if (isMouseEvent(e) && e.which !== 1) return;

    this.handleMouseButtonDown(e, true);
  };

  handleContextMenu = (e: any) => {
    if (!this.clickedOwnCanvas(e)) return;
    e.preventDefault();

    this.handleMouseButtonDown(e, false);
  };

  handleMouseButtonDown = (e: MouseEvent | TouchEvent, isLeft?: boolean) => {
    this.setCanvasData(e);
    if (this.props.onMouseDown) {
      const canvasPos: Vector = this.calculateCanvasPos(e);
      this.props.onMouseDown(canvasPos, isLeft!);
    }

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("touchmove", this.handleMouseMove);
    window.addEventListener("touchend", this.handleMouseUp);
  };

  clickedOwnCanvas = ({ target }: MouseEvent | TouchEvent): boolean => {
    const { window, paint, toolType } = this.props;
    if (!window.focused) return false;

    const isToolSelected = paint.selectedTool === toolType;
    const targetClassName = `${canvasClass}--main`;
    const clickedCanvas = (target as Element).classList.contains(
      targetClassName
    );

    return isToolSelected && clickedCanvas;
  };

  setCanvasData = (e: MouseEvent | TouchEvent) => {
    const { left, top } = (e.target as any).getClientRects()[0];
    this.setState({ canvasLeft: left, canvasTop: top });
  };

  handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (this.props.onMouseMove) {
      const canvasPos: Vector = this.calculateCanvasPos(e);
      this.props.onMouseMove(canvasPos);
    }
  };

  handleMouseUp = (e: MouseEvent | TouchEvent) => {
    if (this.props.onMouseUp) {
      const canvasPos: Vector = this.calculateCanvasPos(e);
      this.props.onMouseUp(canvasPos);
    }

    this.removeMoveAndUpListeners();
  };

  calculateCanvasPos = (event: MouseEvent | TouchEvent): Vector => {
    const { zoom } = this.props.paint.options;
    const { canvasLeft, canvasTop } = this.state;
    const windowPos = getWindowPosition(event);

    const pos = new Vector(windowPos.x - canvasLeft, windowPos.y - canvasTop);
    const zoomedPos = Vector.div(pos, zoom);
    const roundedPos = Vector.map(zoomedPos, Math.round);

    return roundedPos;
  };

  handleIconClick = () => {
    const { window, paint, notImplemented, toolType } = this.props;

    if (notImplemented) {
      window.setContext({ disabled: true });
      paint.setContext({ showError: true });
      return;
    }

    paint.setContext({
      lastSelectedTool: paint.selectedTool,
      selectedTool: toolType
    });
  };

  getClassName = () => {
    const { paint, toolType } = this.props;
    const baseClass = "paint__toolbar__tool";
    const modifiers = { selected: toolType === paint.selectedTool };

    return getClassName(baseClass, modifiers);
  };

  render() {
    const toolClassName = this.getClassName();

    return (
      <div
        className={toolClassName}
        onClick={this.handleIconClick}
        data-test="tool"
      >
        <img src={this.props.icon} alt="tool" className="paint__tool__icon" />
      </div>
    );
  }
}

export default withContext(withContext(Tool, "window"), "paint");
