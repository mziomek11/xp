import React, { Component } from "react";

import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../../../../utils";

import folderUpGrey from "../../../../../assets/folder/folder-up-grey.png";
import folderUpColored from "../../../../../assets/folder/folder-up-colored.png";

type Props = { context: FilesystemContextType };

export class FolderUp extends Component<Props, {}> {
  shouldComponentUpdate({ context }: Props) {
    const currShorts = this.props.context.shortcuts;
    const values = ["disabled"];

    return !areObjectsEqual(currShorts.goUp, context.shortcuts.goUp, values);
  }
  handleClick = () => {
    const { disabled, emit } = this.props.context.shortcuts.goUp;
    if (!disabled) emit();
  };

  render() {
    const { disabled } = this.props.context.shortcuts.goUp;
    const className = getClassName("filesystem__action", { disabled });
    const icon = disabled ? folderUpGrey : folderUpColored;

    return (
      <div
        className={className}
        onClick={this.handleClick}
        data-test="container"
      >
        <img src={icon} alt="folder with arrow up" data-test="image" />
      </div>
    );
  }
}

export default withContext(FolderUp, "filesystem");
