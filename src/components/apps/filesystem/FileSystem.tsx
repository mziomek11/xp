import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { areObjectsEqual } from "../../../utils";

import Menu from "./menu/Menu";
import ActionBar from "./action/Bar";
import AdressBar from "./adress/Bar";
import SideBar from "./side/Bar";
import FileList from "./file/List";
import Folders from "./folders/Folders";

type Props = { filesystem: FilesystemContextType };

export class FileSystem extends Component<Props> {
  shouldComponentUpdate({ filesystem }: Props) {
    const currOptions = this.props.filesystem.options;
    const values = ["showFolders"];

    return !areObjectsEqual(currOptions, filesystem.options, values);
  }

  render() {
    return (
      <div className="filesystem" data-test="filesystem">
        <div className="filesystem__menu" data-test="menu-container">
          <Menu data-test="menu" />
          <div className="filesystem__menu__logo" data-test="menu-logo" />
        </div>
        <ActionBar data-test="action-bar" />
        <AdressBar data-test="adress-bar" />
        <div className="filesystem__divider">
          {this.props.filesystem.options.showFolders ? (
            <Folders data-test="folders" />
          ) : (
            <SideBar data-test="side-bar" />
          )}
          <FileList isFilePicker={false} data-test="file-list" />
        </div>
      </div>
    );
  }
}

export default withContext(FileSystem, "filesystem");
