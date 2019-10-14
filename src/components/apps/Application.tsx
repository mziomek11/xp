import React, { Component } from "react";
import { connect } from "react-redux";

import FileSystem from "./filesystem/FileSystem";
import Notepad from "./notepad/Notepad";
import Paint from "./paint/Paint";
import WindowContainer from "../window/WindowContainer";
import windowConfig from "../../config/window";
import toolbarConfig from "../../config/toolbar";
import { Provider as FilesystemContextProvider } from "./filesystem/context/Context";
import { Provider as NotepadContextProvider } from "./notepad/context/Context";
import { Provider as PaintContextProvider } from "./paint/context/Context";
import { RootState } from "MyTypes";
import { Window } from "../../store/window/models";
import {
  Provider as WindowContextProvider,
  OwnProps as WindowOwnProps,
  StartProps as WindowStartProps
} from "../window/Context";

type WindowSizeProps = Omit<WindowOwnProps, "id">;

type OwnProps = {
  id: string;
};

type StateProps = {
  window: Window;
  screenWidth: number;
  screenHeight: number;
};

type Props = OwnProps & StateProps;

export class Application extends Component<Props, {}> {
  getApplication = () => {
    switch (this.props.window.application) {
      case "filesystem":
        return this.getFilesystemApp();
      case "notepad":
        return this.getNotepadApp();
      case "paint":
        return this.getPaintApp();
      default:
        throw Error(`${this.props.window.application} is not an application`);
    }
  };

  getFilesystemApp = () => (
    <FilesystemContextProvider
      id={this.props.id}
      startPath={[]}
      defaultDisplay="tiles"
    >
      <FileSystem data-test="filesystem" />
    </FilesystemContextProvider>
  );

  getNotepadApp = () => {
    const { content, path } = this.props.window.openData!;
    return (
      <NotepadContextProvider startText={content as string} startPath={path}>
        <Notepad data-test="notepad" />
      </NotepadContextProvider>
    );
  };

  getPaintApp = () => {
    return (
      <PaintContextProvider>
        <Paint data-test="paint" />
      </PaintContextProvider>
    );
  };

  getWindowCtxProps = () => {
    const windowSizes = this.getWindowSizes();
    const startProps = this.getWindowStartProps(windowSizes);

    return {
      id: this.props.id,
      ...windowSizes,
      ...startProps
    };
  };

  getWindowSizes = (): WindowSizeProps => {
    switch (this.props.window.application) {
      default:
        return this.getDefaultWindowSizes();
    }
  };

  getDefaultWindowSizes = (): WindowSizeProps => ({
    minWidth: windowConfig.MINIMAL_WIDTH,
    maxWidth: this.props.screenWidth,
    minHeight: windowConfig.MINIMAL_HEIGHT,
    maxHeight: this.props.screenHeight - toolbarConfig.HEIGHT
  });

  getWindowStartProps = (sizeProps: WindowSizeProps): WindowStartProps => {
    switch (this.props.window.application) {
      default:
        return this.getDefaultStartProps(sizeProps);
    }
  };

  getDefaultStartProps = (sizeProps: WindowSizeProps): WindowStartProps => {
    const { maxWidth, maxHeight } = sizeProps;
    const { INITIAL_WIDTH, INITIAL_HEIGHT } = windowConfig;

    const startWidth: number = Math.min(maxWidth, INITIAL_WIDTH);
    const startHeight: number = Math.min(maxHeight, INITIAL_HEIGHT);

    return {
      startFullscreened: false,
      startWidth,
      startHeight,
      ...this.getStartPosition(startWidth, maxWidth, startHeight, maxHeight)
    };
  };

  getStartPosition = (
    width: number,
    maxWidth: number,
    height: number,
    maxHeight: number
  ) => ({
    startLeft: maxWidth / 2 - width / 2,
    startTop: maxHeight / 2 - height / 2
  });

  render() {
    const windowCtxProps = this.getWindowCtxProps();

    return (
      <WindowContextProvider {...windowCtxProps} data-test="ctx">
        <WindowContainer>{this.getApplication()}</WindowContainer>
      </WindowContextProvider>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => {
  return {
    window: state.window.byId[id],
    screenWidth: state.screen.width,
    screenHeight: state.screen.height
  };
};

export default connect(mapStateToProps)(Application);
