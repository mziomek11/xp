import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import ListItem from "../ListItem";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { FileType } from "../../../../../store/filesystem/models";
import { create } from "../../../../../store/filesystem/actions";

import createIcon from "../../../../../assets/folder/create.png";

type OwnProps = {
  context: FilesystemContextType;
};

type DispatchProps = {
  createFolder: (path: string[], type: FileType) => void;
};

type Props = OwnProps & DispatchProps;

const NoFocusedOptions: React.FC<Props> = ({ context, createFolder }) => {
  const handleCreateClick = () => createFolder(context.path, "folder");

  return (
    <ul className="filesystem__side__list">
      <ListItem icon={createIcon} onClick={handleCreateClick}>
        Create new folder
      </ListItem>
    </ul>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    createFolder: (path, type) => dispatch(create(path, type))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withContext(NoFocusedOptions, "filesystem"));
