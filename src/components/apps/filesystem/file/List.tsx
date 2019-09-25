import React, { Component, createRef } from "react";

import FileContainer from "./FileContainer";
import DiskHeader from "./DiskHeader";
import FocusRect, { StartEventData } from "./FocusRect";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { pathArrayToString } from "../../../../utils/filesystem";
import { listClass } from "../classNames";
import {
  getClassName,
  areArraysEqual,
  areObjectsEqual
} from "../../../../utils";

type Props = {
  context: FilesystemContextType;
};

type State = {
  creatingRect: boolean;
  mouseDownData: StartEventData;
};

export class List extends Component<Props, State> {
  readonly state: State = {
    creatingRect: false,
    mouseDownData: {
      clientX: 0,
      clientY: 0,
      filesLeft: 0,
      filesTop: 0,
      filesWidth: 0
    }
  };

  private container = createRef<HTMLDivElement>();

  shouldComponentUpdate({ context }: Props, { creatingRect }: State) {
    const { path, options, files } = this.props.context;

    if (this.state.creatingRect !== creatingRect) return true;
    if (!areArraysEqual(path, context.path)) return true;
    if (options.display !== context.options.display) return true;
    if (files.length !== context.files.length) return true;
    for (let i = 0; i < files.length; i++) {
      if (!areObjectsEqual(files[i], context.files[i], ["name", "type"])) {
        return true;
      }
    }

    return false;
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.context.renamedFile !== null) return null;
    const clientRects = (e.currentTarget as Element).getClientRects()[0];
    const { left, top, width } = clientRects;

    this.setState({
      creatingRect: true,
      mouseDownData: {
        clientX: e.clientX,
        clientY: e.clientY,
        filesLeft: left,
        filesTop: top,
        filesWidth: width
      }
    });
  };

  handleMouseUp = () => this.setState({ creatingRect: false });

  render() {
    const { path, files, options } = this.props.context;
    const { creatingRect, mouseDownData } = this.state;

    const showDiskHeader = path.length === 0 && options.display !== "list";
    const pathWithSlashes = pathArrayToString(path);
    const className = getClassName(listClass, { computer: showDiskHeader });

    return (
      <div
        className={className}
        onMouseDown={this.handleMouseDown}
        ref={this.container}
        data-test="container"
      >
        {showDiskHeader && <DiskHeader data-test="disk-header" />}
        {files.map(file => (
          <FileContainer
            file={file}
            key={pathWithSlashes + file.name}
            data-test="file"
          />
        ))}
        {creatingRect && (
          <FocusRect
            onMouseUp={this.handleMouseUp}
            mouseDownData={mouseDownData as StartEventData}
            containerRef={this.container}
            data-test="focus-rect"
          />
        )}
      </div>
    );
  }
}

export default withContext(List, "filesystem");
