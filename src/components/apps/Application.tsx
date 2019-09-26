import React, { Component } from "react";
import { connect } from "react-redux";

import FileSystem from "./filesystem/FileSystem";
import { Application as AppType } from "../../store/models";
import { Provider as FilesystemContextProvider } from "./filesystem/context/Context";
import { RootState } from "MyTypes";

type OwnProps = {
  id: string;
};

type StateProps = {
  application: AppType;
};

type Props = OwnProps & StateProps;

export class Application extends Component<Props, {}> {
  getApplication = () => {
    switch (this.props.application) {
      case "Filesystem":
        return this.getFilesystemApp();
      default:
        throw Error(`${this.props.application} is not an application`);
    }
  };

  getFilesystemApp = () => (
    <FilesystemContextProvider id={this.props.id} data-test="filesystem">
      <FileSystem />
    </FilesystemContextProvider>
  );

  render() {
    return this.getApplication();
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  application: state.window.byId[id].application
});

export default connect(mapStateToProps)(Application);
