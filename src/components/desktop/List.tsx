import React, { Component } from "react";

import withContext from "../../hoc/withContext";
import { DesktopContextType } from "ContextType";
import {
  notepadStartData,
  paintStartData,
  filesystemStartData,
  getBasicStartData
} from "../../fileStartData";

import File from "./File";
import DesktopFocusRect from "./FocusRect";
import { getWindowPosition } from "../../utils";

type CtxProps = {
  desktop: DesktopContextType;
};

export class FileList extends Component<CtxProps> {
  private baseClassName = "desktop__file__list";
  shouldComponentUpdate({ desktop }: CtxProps) {
    return this.props.desktop.focusingRect !== desktop.focusingRect;
  }

  handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!(e.target as Element).classList.contains(this.baseClassName)) return;

    this.props.desktop.setContext({
      focusedIds: [],
      focusingRect: true,
      startFocusPosition: getWindowPosition(e)
    });
  };

  render() {
    return (
      <div
        className={this.baseClassName}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        data-test="list"
      >
        <File {...filesystemStartData} id={0} />
        <File {...notepadStartData} id={1} />
        <File {...paintStartData} id={2} />
        <File {...getBasicStartData("minesweeper")} id={3} />
        <File {...getBasicStartData("calculator")} id={4} />

        {this.props.desktop.focusingRect && (
          <DesktopFocusRect data-test="rect" />
        )}
      </div>
    );
  }
}

export default withContext(FileList, "desktop");
