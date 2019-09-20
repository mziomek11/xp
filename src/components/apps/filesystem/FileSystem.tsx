import React from "react";

import withContext from "../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

import Menu from "./menu/Menu";
import ActionBar from "./action/Bar";
import AdressBar from "./adress/Bar";
import SideBar from "./side/Bar";
import FileList from "./file/List";
import Folders from "./folders/Folders";

export const FileSystem: React.FC<{ context: FilesystemContextType }> = ({
  context
}) => {
  return (
    <div className="filesystem" data-test="filesystem">
      <div className="filesystem__menu-container" data-test="menu-container">
        <Menu data-test="menu" />
        <div className="filesystem__menu-logo" data-test="menu-logo" />
      </div>
      <ActionBar data-test="action-bar" />
      <AdressBar data-test="adress-bar" />
      <div className="filesystem__content-divider">
        {context.options.showFolders ? (
          <Folders data-test="folders" />
        ) : (
          <SideBar data-test="side-bar" />
        )}
        <FileList data-test="file-list" />
      </div>
    </div>
  );
};

export default withContext(FileSystem, "filesystem");
