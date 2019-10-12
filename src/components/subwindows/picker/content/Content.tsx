import React from "react";
import { connect } from "react-redux";

import Navigation from "./navigation/Navigation";
import FileList from "../../../apps/filesystem/file/List";
import { RootState } from "MyTypes";
import { FileTree } from "../../../../store/filesystem/models";
import {
  ContextProvider as FilesystemProvider,
  Props as CtxProps
} from "../../../apps/filesystem/context/Context";

export type OwnProps = {
  filePath: string[] | undefined;
  id: string;
};

type StateProps = {
  fileTree: FileTree;
};

type Props = OwnProps & StateProps;

export const Content: React.FC<Props> = ({
  id,
  fileTree,
  filePath,
  children
}) => {
  const filesystemProps: Partial<CtxProps> = {
    id: id,
    fileTree: fileTree,
    copiedFiles: {},
    renameWindow: (x, y) => {},
    defaultDisplay: "list",
    startPath: filePath ? filePath : ["Local Disk (C:)"]
  };

  return (
    <FilesystemProvider {...(filesystemProps as any)} data-test="provider">
      <div className="picker">
        <Navigation data-test="navigation" />
        <div className="picker__files">
          <FileList isFilePicker data-test="file-list" />
        </div>
        {children}
      </div>
    </FilesystemProvider>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fileTree: state.fileSystem.files
  };
};

export default connect(mapStateToProps)(Content);
