import React, { Component, CSSProperties } from "react";

import withContext from "../../../../hoc/withContext";
import Vector from "../../../../classes/Vector";
import { FilesystemContextType } from "ContextType";
import { filesystemConfig } from "../../../../config";
import { areArraysEqual, getWindowPosition } from "../../../../utils";

export type StartEventData = {
  windowPosition: Vector;
  filesLeft: number;
  filesTop: number;
  filesWidth: number;
};

type OwnProps = {
  mouseDownData: StartEventData;
  onMouseUp: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  filesystem: FilesystemContextType;
};

type Props = OwnProps;

type StyleState = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type State = StyleState & {
  startLeft: number;
  startTop: number;
};

export class FocusRect extends Component<Props, State> {
  readonly state: State = {
    startLeft: 0,
    startTop: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };

  componentDidMount() {
    const { mouseDownData, containerRef } = this.props;
    const { windowPosition, filesLeft, filesTop } = mouseDownData;
    const { scrollTop } = containerRef.current as any;

    const startLeft = windowPosition.x - filesLeft;
    const startTop = windowPosition.y - filesTop + scrollTop;

    this.setState({ startLeft, startTop });

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    window.addEventListener("touchmove", this.handleMouseMove);
    window.addEventListener("touchend", this.handleMouseUp);
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    window.removeEventListener("touchmove", this.handleMouseMove);
    window.removeEventListener("touchend", this.handleMouseUp);
  };

  handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const { setFocused, focused } = this.props.filesystem;

    const windowPosition = getWindowPosition(e);
    const newState: StyleState = this.calculateNewState(windowPosition);
    this.setState(newState);

    const newFocused = this.calculateFocusedFiles(newState);
    if (!areArraysEqual(focused, newFocused)) {
      setFocused(newFocused);
    }
  };

  calculateNewState = (windowPosition: Vector): StyleState => {
    const newWidth = this.calculateWidth(windowPosition.x);
    const newHeight = this.calculateHeight(windowPosition.y);

    return {
      left: this.calculateLeft(windowPosition.x, newWidth),
      top: this.calculateTop(windowPosition.y, newHeight),
      width: newWidth,
      height: newHeight
    };
  };

  calculateWidth = (mouseX: number): number => {
    return Math.abs(mouseX - this.props.mouseDownData.windowPosition.x);
  };

  calculateHeight = (mouseY: number): number => {
    const { containerRef, mouseDownData } = this.props;
    const { scrollTop, scrollHeight } = containerRef.current as Element;
    const { filesTop, windowPosition } = mouseDownData;
    const { startTop } = this.state;

    const actualTop = mouseY - filesTop + scrollTop;
    const heightPossibleTooBig = Math.abs(startTop - actualTop);
    const top =
      startTop - (mouseY > windowPosition.y ? 0 : heightPossibleTooBig);

    const height = Math.min(scrollHeight - top, heightPossibleTooBig);

    return height;
  };

  calculateLeft = (mouseX: number, width: number): number => {
    const { startLeft } = this.state;
    const { x } = this.props.mouseDownData.windowPosition;

    return startLeft - (mouseX > x ? 0 : width);
  };

  calculateTop = (mouseY: number, height: number): number => {
    const { startTop } = this.state;
    const { y } = this.props.mouseDownData.windowPosition;

    return startTop - (mouseY > y ? 0 : height);
  };

  calculateFocusedFiles = (styleState: StyleState) => {
    const { files } = this.props.filesystem;
    const loopData = this.calculateFocusLoopData(styleState);
    const { filesInCol, startCol, endCol, startRow, endRow } = loopData;

    const filesInRect: string[] = [];

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const fileIndex = row * filesInCol + col;
        const file = files[fileIndex];

        if (file) filesInRect.push(file.name);
      }
    }

    return filesInRect;
  };

  calculateFocusLoopData = ({ left, top, width, height }: StyleState) => {
    const { floor, max, min } = Math;
    const { fileWidth, fileHeight } = this.getFileWidthAndHeight();
    const { filesWidth } = this.props.mouseDownData;
    const { path } = this.props.filesystem;

    if (path.length === 0) {
      top -= filesystemConfig.DISK_HEADER_HEIGHT;
    }

    const filesInCol = floor(filesWidth / fileWidth);
    const startCol = max(0, floor(left / fileWidth));
    const endCol = min(filesInCol - 1, floor((left + width) / fileWidth));
    const startRow = max(0, floor(top / fileHeight));
    const endRow = floor((top + height) / fileHeight);

    return { filesInCol, startCol, endCol, startRow, endRow };
  };

  getFileWidthAndHeight = (): { fileWidth: number; fileHeight: number } => {
    switch (this.props.filesystem.options.display) {
      case "thumbnails":
        return {
          fileWidth: filesystemConfig.THUMBNAIL_WIDTH,
          fileHeight: filesystemConfig.THUMBNAIL_HEIGHT
        };
      case "tiles":
        return {
          fileWidth: filesystemConfig.TILE_WIDTH,
          fileHeight: filesystemConfig.TILE_HEIGHT
        };
      case "icons":
        return {
          fileWidth: filesystemConfig.ICON_WIDTH,
          fileHeight: filesystemConfig.ICON_HEIGHT
        };
      case "list":
        return {
          fileWidth: this.props.mouseDownData.filesWidth - 1,
          fileHeight: filesystemConfig.LIST_HEIGHT
        };
      default:
        throw Error("Wrong display type");
    }
  };

  handleMouseUp = () => {
    this.removeListeners();
    this.props.onMouseUp();
  };

  getInlineStyles = (): CSSProperties => {
    const { left, top, width, height } = this.state;
    const display = width === 0 || height === 0 ? "none" : "block";

    return { left, top, width, height, display };
  };

  render() {
    const inlineStyles = this.getInlineStyles();

    return (
      <div
        className="filesystem__file__focus-rect"
        style={inlineStyles}
        data-test="rect"
      />
    );
  }
}

export default withContext(FocusRect, "filesystem");
