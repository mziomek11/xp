import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { getClassName } from "../../../../utils";
import { Tool as ToolType } from "../models";
import { PaintContextType, WindowContextType } from "ContextType";
import { canvasClass } from "../classes";
import { Vector } from "../../../../utils/paint";

type VectorVoid = (v: Vector) => void;
type OwnProps = {
  icon: string;
  toolType: ToolType;
  onMouseLeftDown?: VectorVoid;
  onMouseRightDown?: VectorVoid;
  onMouseMove?: VectorVoid;
  onMouseUp?: VectorVoid;
  onToolChange?: VoidFunction;
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
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("contextmenu", this.handleContextMenu);
    this.removeMoveAndUpListeners();
  }

  removeMoveAndUpListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseDown = (e: MouseEvent) => {
    if (!this.clickedOwnCanvas(e)) return;
    if (e.which !== 1) return;

    this.handleMouseButtonDown(e, this.props.onMouseLeftDown);
  };

  handleContextMenu = (e: any) => {
    if (!this.clickedOwnCanvas(e)) return;
    e.preventDefault();

    this.handleMouseButtonDown(e, this.props.onMouseRightDown);
  };

  handleMouseButtonDown = (
    e: MouseEvent,
    additonalFn?: (canvasPos: Vector) => void
  ) => {
    this.setCanvasData(e);
    if (additonalFn) {
      const canvasPos: Vector = this.calculateCanvasPos(e);
      additonalFn(canvasPos);
    }

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  clickedOwnCanvas = ({ target }: MouseEvent): boolean => {
    const { window, paint, toolType } = this.props;
    if (!window.focused) return false;

    const isToolSelected = paint.selectedTool === toolType;
    const targetClassName = `${canvasClass}--main`;
    const clickedCanvas = (target as Element).classList.contains(
      targetClassName
    );

    return isToolSelected && clickedCanvas;
  };

  setCanvasData = (e: MouseEvent) => {
    const { left, top } = (e.target as any).getClientRects()[0];
    this.setState({ canvasLeft: left, canvasTop: top });
  };

  handleMouseMove = (e: MouseEvent) => {
    if (this.props.onMouseMove) {
      const canvasPos: Vector = this.calculateCanvasPos(e);
      this.props.onMouseMove(canvasPos);
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    if (this.props.onMouseUp) {
      const canvasPos: Vector = this.calculateCanvasPos(e);
      this.props.onMouseUp(canvasPos);
    }

    this.removeMoveAndUpListeners();
  };

  calculateCanvasPos = (event: MouseEvent): Vector => {
    const { clientX, clientY } = event;
    const { canvasLeft, canvasTop } = this.state;
    const canvasX = Math.floor(clientX - canvasLeft);
    const canvasY = Math.floor(clientY - canvasTop);

    return { x: canvasX, y: canvasY };
  };

  handleIconClick = () => {
    const { setContext, selectedTool } = this.props.paint;
    setContext({
      lastSelectedTool: selectedTool,
      selectedTool: this.props.toolType
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
