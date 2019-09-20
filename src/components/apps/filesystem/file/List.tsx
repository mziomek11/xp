import React, { Component, createRef } from "react";

import FileContainer from "./FileContainer";
import DiskHeader from "./DiskHeader";
import FocusRect, { StartEventData } from "./FocusRect";
import withContext from "../../../../hoc/withContext";
import { getClassName } from "../../../../utils";
import { FilesystemContextType } from "ContextType";
import { pathArrayToString } from "../../../../utils/filesystem";
import { listClass } from "../classNames";

type OwnProps = {
  context: FilesystemContextType;
};

type State = {
  creatingReact: boolean;
  mouseDownData: StartEventData;
};

export class List extends Component<OwnProps, State> {
  readonly state: State = {
    creatingReact: false,
    mouseDownData: {
      clientX: 0,
      clientY: 0,
      filesLeft: 0,
      filesTop: 0,
      filesWidth: 0
    }
  };

  private container = createRef<HTMLDivElement>();

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.context.renamedFile !== null) return null;
    const clientRects = (e.currentTarget as Element).getClientRects()[0];
    const { left, top, width } = clientRects;

    this.setState({
      creatingReact: true,
      mouseDownData: {
        clientX: e.clientX,
        clientY: e.clientY,
        filesLeft: left,
        filesTop: top,
        filesWidth: width
      }
    });
  };

  handleMouseUp = () => this.setState({ creatingReact: false });

  render() {
    const { path, files, options } = this.props.context;
    const { creatingReact, mouseDownData } = this.state;

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
        {creatingReact && (
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
