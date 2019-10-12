import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Form from "../content/form/Form";
import withContext from "../../../../hoc/withContext";
import { RootState } from "MyTypes";
import { FilesystemContextType, WindowContextType } from "ContextType";
import { rename as renameWindow } from "../../../../store/window/actions";
import { FileType, Content } from "../../../../store/filesystem/models";
import { create, updateContent } from "../../../../store/filesystem/actions";

export type OwnProps = {
  content: any;
  id: string;
  setFilePath: (path: string[]) => void;
  fileType: FileType;
};

type CtxProps = {
  filesystem: FilesystemContextType;
  window: WindowContextType;
};

type StateProps = {
  windowName: string;
};

type DispatchProps = {
  renameWindow: (name: string) => void;
  updateContent: (path: string[], name: string, content: Content) => void;
  create: (
    path: string[],
    data: { name: string; type: FileType; content: any }
  ) => void;
};

type Props = OwnProps & CtxProps & StateProps & DispatchProps;

export class Saving extends Component<Props, {}> {
  handleSave = (text: string) => {
    const { window, filesystem, content, fileType } = this.props;
    const { path, files } = filesystem;

    if (text === "" || path.length === 0) return;

    const file = files.filter(({ name }) => name === text)[0];
    if (file && file.type !== fileType) return;

    if (file) this.props.updateContent(path, text, content);
    else this.props.create(path, { name: text, type: fileType, content });

    this.props.renameWindow(text);
    this.props.setFilePath(path);
    window.close();
  };

  render() {
    return (
      <Form
        startText={this.props.windowName}
        acceptText="Save"
        fileType={this.props.fileType}
        onSubmit={this.handleSave}
        data-test="form"
      />
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => {
  return {
    windowName: state.window.byId[id].name
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  renameWindow: name => dispatch(renameWindow(id, name)),
  create: (path, data) => dispatch(create(path, data)),
  updateContent: (path, name, content) =>
    dispatch(updateContent(path, name, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withContext(withContext(Saving, "window"), "filesystem"));
