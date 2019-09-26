import React from "react";
import { connect } from "react-redux";

import TreeNode from "./Node";
import { OwnProps as TreeOwnProps } from "./Tree";
import { RootState } from "MyTypes";
import { getIcon } from "../../../../icons";
import { FileTree } from "../../../../store/filesystem/models";

type StateProps = {
  fileTree: FileTree;
};

type Props = TreeOwnProps & StateProps;

export const ComputerNode: React.FC<Props> = ({
  onClick,
  selectedPath,
  fileTree,
  withToggler
}) => {
  return (
    <TreeNode
      type="computer"
      name="Computer"
      icon={getIcon("filesystem")}
      filePath={[]}
      selectedPath={selectedPath}
      onClick={onClick}
      content={fileTree}
      withToggler={withToggler}
      data-test="node"
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fileTree: state.fileSystem.files
  };
};

export default connect(mapStateToProps)(ComputerNode);
