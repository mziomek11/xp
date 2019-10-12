import React, { Component } from "react";
import uuid from "uuid";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Form from "../content/form/Form";
import withContext from "../../../../hoc/withContext";
import { RootState } from "MyTypes";
import { FilesystemContextType } from "ContextType";
import { replace as replaceWindow } from "../../../../store/window/actions";
import { FileType } from "../../../../store/filesystem/models";
import { Window } from "../../../../store/window/models";
import { Application } from "../../../../store/models";

export type OwnProps = {
  id: string;
  fileType: FileType;
};

type CtxProps = {
  filesystem: FilesystemContextType;
};

type StateProps = {
  icon: string;
  application: Application;
};

type DispatchProps = {
  replaceWindow: (newWindow: Window) => void;
};

type Props = OwnProps & CtxProps & StateProps & DispatchProps;

export class Open extends Component<Props, {}> {
  handleOpen = (text: string) => {
    const { filesystem, fileType, application, icon } = this.props;
    const { files, path } = filesystem;
    if (text === "" || path.length === 0) return;

    const file = files.filter(({ name }) => name === text)[0];
    if (!file || file.type !== fileType) return;

    const newWindow: Window = {
      id: uuid(),
      name: file.name,
      icon,
      application,
      minimalized: false,
      openData: {
        content: file.content,
        path
      }
    };

    this.props.replaceWindow(newWindow);
  };

  render() {
    return (
      <Form
        startText=""
        acceptText="Open"
        fileType={this.props.fileType}
        onSubmit={this.handleOpen}
        data-test="form"
      />
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  icon: state.window.byId[id].icon,
  application: state.window.byId[id].application
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  replaceWindow: newWindow => dispatch(replaceWindow(id, newWindow))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withContext(Open, "filesystem"));
