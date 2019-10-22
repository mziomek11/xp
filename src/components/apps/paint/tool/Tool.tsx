import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { getClassName } from "../../../../utils";
import { Tool as ToolType } from "../models";
import { PaintContextType, WindowContextType } from "ContextType";
import { canvasClass } from "../classes";
type OwnProps = {
  icon: string;
  toolType: ToolType;
  onMouseDown?: (x: number, y: number) => void;
  onMouseMove?: (x: number, y: number) => void;
  onMouseUp?: (x: number, y: number) => void;
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

  componentDidMount() {
    window.addEventListener("mousedown", this.handleMouseDown);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleMouseDown);
    this.removeMoveAndUpListeners();
  }

  removeMoveAndUpListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseDown = (e: MouseEvent) => {
    if (!this.clickedOwnCanvas(e)) return;

    this.setCanvasData(e);
    if (this.props.onMouseDown) {
      const { x, y } = this.calculateCanvasPos(e);
      this.props.onMouseDown(x, y);
    }

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  clickedOwnCanvas = ({ target }: MouseEvent): boolean => {
    const { window, paint, toolType } = this.props;
    if (!window.focused) return false;

    const isToolSelected = paint.selectedTool === toolType;
    const clickedCanvas = (target as Element).classList.contains(canvasClass);

    return isToolSelected && clickedCanvas;
  };

  setCanvasData = (e: MouseEvent) => {
    const { left, top } = (e.target as any).getClientRects()[0];
    this.setState({ canvasLeft: left, canvasTop: top });
  };

  handleMouseMove = (e: MouseEvent) => {
    if (this.props.onMouseMove) {
      const { x, y } = this.calculateCanvasPos(e);
      this.props.onMouseMove(x, y);
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    if (this.props.onMouseUp) {
      const { x, y } = this.calculateCanvasPos(e);
      this.props.onMouseUp(x, y);
    }

    this.removeMoveAndUpListeners();
  };

  calculateCanvasPos = (event: MouseEvent): { x: number; y: number } => {
    const { clientX, clientY } = event;
    const { canvasLeft, canvasTop } = this.state;
    const canvasX = clientX - canvasLeft;
    const canvasY = clientY - canvasTop;

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
