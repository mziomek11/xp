import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import ListItem from "../ListItem";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { createFolder } from "../../../../../store/filesystem/actions";

import createIcon from "../../../../../assets/folder/create.png";

type OwnProps = {
  filesystem: FilesystemContextType;
};

type DispatchProps = {
  createFolder: (path: string[]) => void;
};

type Props = OwnProps & DispatchProps;

const NoFocusedOptions: React.FC<Props> = ({ filesystem, createFolder }) => {
  const handleCreateClick = () => createFolder(filesystem.path);

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
    createFolder: path => dispatch(createFolder(path))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withContext(NoFocusedOptions, "filesystem"));
