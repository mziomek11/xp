import React, { Component } from "react";

import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../../../../utils";

import folderUpGrey from "../../../../../assets/folder/folder-up-grey.png";
import folderUpColored from "../../../../../assets/folder/folder-up-colored.png";

type Props = { filesystem: FilesystemContextType; small?: boolean };

export class FolderUp extends Component<Props, {}> {
  public static defaultProps = {
    small: false
  };

  shouldComponentUpdate({ filesystem }: Props) {
    const currShorts = this.props.filesystem.shortcuts;
    const values = ["disabled"];

    return !areObjectsEqual(currShorts.goUp, filesystem.shortcuts.goUp, values);
  }

  handleClick = () => {
    const { disabled, emit } = this.props.filesystem.shortcuts.goUp;
    if (!disabled) emit();
  };

  render() {
    const { small, filesystem } = this.props;
    const { disabled } = filesystem.shortcuts.goUp;
    const icon = disabled ? folderUpGrey : folderUpColored;
    const className = getClassName("filesystem__action", {
      disabled,
      small: small!
    });
    const iconClass = getClassName("filesystem__action__icon", {
      small: small!
    });

    return (
      <div
        className={className}
        onClick={this.handleClick}
        data-test="container"
      >
        <img
          src={icon}
          className={iconClass}
          alt="folder with arrow up"
          data-test="image"
        />
      </div>
    );
  }
}

export default withContext(FolderUp, "filesystem");
