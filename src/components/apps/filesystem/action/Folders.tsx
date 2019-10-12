import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../../../utils";

import foldersIcon from "../../../../assets/folder/folders.png";

type Props = { filesystem: FilesystemContextType };

export class Folders extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const currOptions = this.props.filesystem.options;
    const values = ["showFolders"];

    return !areObjectsEqual(currOptions, filesystem.options, values);
  }

  handleClick = () => {
    const { setOptions, options } = this.props.filesystem;
    setOptions({ showFolders: !options.showFolders });
  };

  render() {
    const className = getClassName("filesystem__action", {
      activated: this.props.filesystem.options.showFolders
    });

    return (
      <div className="filesystem__actions" data-test="container">
        <div
          className={className}
          onClick={this.handleClick}
          data-test="clickable"
        >
          <img src={foldersIcon} alt="folders icon" />
          <span className="filesystem__action__text">Folders</span>
        </div>
      </div>
    );
  }
}

export default withContext(Folders, "filesystem");
